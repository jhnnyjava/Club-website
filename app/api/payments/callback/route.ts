import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { emailService } from '@/lib/email'
import { calculateExpiryDate } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('M-Pesa callback received:', JSON.stringify(body, null, 2))

    // Extract callback data
    const { Body } = body
    const { stkCallback } = Body

    const merchantRequestId = stkCallback.MerchantRequestID
    const checkoutRequestId = stkCallback.CheckoutRequestID
    const resultCode = stkCallback.ResultCode
    const resultDesc = stkCallback.ResultDesc

    // Find payment record
    const payment = await prisma.payment.findUnique({
      where: { checkoutRequestId },
      include: { user: true },
    })

    if (!payment) {
      console.error('Payment not found for checkout request:', checkoutRequestId)
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    // Check if callback already processed (idempotency)
    if (payment.callbackReceived) {
      console.log('Callback already processed for payment:', payment.id)
      return NextResponse.json({ message: 'Callback already processed' })
    }

    // Update payment with callback info
    if (resultCode === 0) {
      // Payment successful
      const callbackMetadata = stkCallback.CallbackMetadata?.Item || []
      const mpesaReceiptNumber = callbackMetadata.find(
        (item: any) => item.Name === 'MpesaReceiptNumber'
      )?.Value
      const transactionDate = callbackMetadata.find(
        (item: any) => item.Name === 'TransactionDate'
      )?.Value

      // Parse transaction date (format: YYYYMMDDHHMMSS)
      let parsedDate: Date | undefined
      if (transactionDate) {
        const year = transactionDate.toString().slice(0, 4)
        const month = transactionDate.toString().slice(4, 6)
        const day = transactionDate.toString().slice(6, 8)
        const hour = transactionDate.toString().slice(8, 10)
        const minute = transactionDate.toString().slice(10, 12)
        const second = transactionDate.toString().slice(12, 14)
        parsedDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
      }

      // Update payment
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'SUCCESS',
          mpesaReceiptNumber,
          transactionDate: parsedDate,
          callbackReceived: true,
          callbackAt: new Date(),
        },
      })

      // Update or create membership
      const durationDays = parseInt(process.env.NEXT_PUBLIC_MEMBERSHIP_DURATION_DAYS || '30')
      const now = new Date()
      const expiresAt = calculateExpiryDate(now, durationDays)

      await prisma.membership.upsert({
        where: { userId: payment.userId },
        update: {
          status: 'ACTIVE',
          startedAt: now,
          expiresAt,
          renewalSent: false,
        },
        create: {
          userId: payment.userId,
          status: 'ACTIVE',
          startedAt: now,
          expiresAt,
        },
      })

      // Send payment receipt email
      await emailService.sendPaymentReceipt(
        payment.user.email,
        payment.user.name || 'Member',
        payment.amount,
        mpesaReceiptNumber || payment.id,
        parsedDate || new Date()
      )
    } else {
      // Payment failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'FAILED',
          failureReason: resultDesc,
          callbackReceived: true,
          callbackAt: new Date(),
        },
      })

      // Send failure email
      await emailService.sendPaymentFailed(
        payment.user.email,
        payment.user.name || 'Member',
        resultDesc
      )
    }

    return NextResponse.json({ message: 'Callback processed successfully' })
  } catch (error) {
    console.error('Callback processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process callback' },
      { status: 500 }
    )
  }
}
