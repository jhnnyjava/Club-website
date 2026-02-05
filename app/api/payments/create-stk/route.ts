import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { mpesaService } from '@/lib/mpesa'
import { rateLimiter } from '@/lib/rate-limit'
import { generateIdempotencyKey, isValidKenyanPhone } from '@/lib/utils'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limiting
    const rateLimitResult = rateLimiter.check(session.user.id)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { phoneNumber, amount, type } = body

    // Validation
    if (!phoneNumber || !amount || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!isValidKenyanPhone(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Validate payment type and amount
    const membershipFee = parseInt(process.env.NEXT_PUBLIC_MEMBERSHIP_FEE || '500')
    const renewalFee = parseInt(process.env.NEXT_PUBLIC_RENEWAL_FEE || '250')

    if (type === 'MEMBERSHIP' && amount !== membershipFee) {
      return NextResponse.json(
        { error: `Membership fee must be ${membershipFee} KES` },
        { status: 400 }
      )
    }

    if (type === 'RENEWAL' && amount !== renewalFee) {
      return NextResponse.json(
        { error: `Renewal fee must be ${renewalFee} KES` },
        { status: 400 }
      )
    }

    // Generate idempotency key
    const idempotencyKey = generateIdempotencyKey(
      `${session.user.id}-${phoneNumber}-${amount}-${Date.now()}`
    )

    // Check for pending payments
    const pendingPayment = await prisma.payment.findFirst({
      where: {
        userId: session.user.id,
        status: 'PENDING',
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000), // Within last 5 minutes
        },
      },
    })

    if (pendingPayment) {
      return NextResponse.json(
        { error: 'You have a pending payment. Please wait or cancel it first.' },
        { status: 400 }
      )
    }

    // Initiate STK Push
    const stkResponse = await mpesaService.initiateSTKPush({
      phoneNumber: phoneNumber,
      amount,
      accountReference: `IEC-${session.user.id}`,
      transactionDesc: type === 'MEMBERSHIP' ? 'IEC Membership Payment' : 'IEC Membership Renewal',
    })

    // Save payment record
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount,
        type,
        phoneNumber,
        merchantRequestId: stkResponse.MerchantRequestID,
        checkoutRequestId: stkResponse.CheckoutRequestID,
        idempotencyKey,
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      success: true,
      message: stkResponse.CustomerMessage,
      paymentId: payment.id,
      checkoutRequestId: stkResponse.CheckoutRequestID,
    })
  } catch (error: any) {
    console.error('STK Push error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to initiate payment' },
      { status: 500 }
    )
  }
}
