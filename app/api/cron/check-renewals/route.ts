import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { emailService } from '@/lib/email'
import { isExpiringSoon } from '@/lib/utils'

// This endpoint should be called by a cron job (e.g., Vercel Cron, GitHub Actions, or external cron service)
// For security, add an authorization header check in production

export async function GET(request: NextRequest) {
  try {
    // Optional: Verify cron secret
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find memberships expiring in 30 days that haven't received renewal reminder
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    const expiringMemberships = await prisma.membership.findMany({
      where: {
        status: 'ACTIVE',
        renewalSent: false,
        expiresAt: {
          lte: thirtyDaysFromNow,
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    })

    const results = {
      checked: expiringMemberships.length,
      sent: 0,
      failed: 0,
    }

    for (const membership of expiringMemberships) {
      if (!membership.expiresAt || !isExpiringSoon(membership.expiresAt, 30)) {
        continue
      }

      const renewalLink = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?action=renew`

      const emailSent = await emailService.sendRenewalReminder(
        membership.user.email,
        membership.user.name || 'Member',
        membership.expiresAt,
        renewalLink
      )

      if (emailSent) {
        await prisma.membership.update({
          where: { id: membership.id },
          data: { renewalSent: true },
        })
        results.sent++
      } else {
        results.failed++
      }
    }

    // Also check for expired memberships and update status
    const expiredMemberships = await prisma.membership.updateMany({
      where: {
        status: 'ACTIVE',
        expiresAt: {
          lt: new Date(),
        },
      },
      data: {
        status: 'EXPIRED',
      },
    })

    return NextResponse.json({
      message: 'Renewal check completed',
      results,
      expiredMemberships: expiredMemberships.count,
    })
  } catch (error) {
    console.error('Renewal check error:', error)
    return NextResponse.json(
      { error: 'Failed to check renewals' },
      { status: 500 }
    )
  }
}
