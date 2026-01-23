import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get total members
    const totalMembers = await prisma.user.count()

    // Get active memberships
    const activeMembers = await prisma.membership.count({
      where: {
        status: 'ACTIVE',
        expiresAt: {
          gte: new Date(),
        },
      },
    })

    // Get expired memberships
    const expiredMembers = await prisma.membership.count({
      where: {
        OR: [
          { status: 'EXPIRED' },
          {
            status: 'ACTIVE',
            expiresAt: {
              lt: new Date(),
            },
          },
        ],
      },
    })

    // Get pending payments
    const pendingPayments = await prisma.payment.count({
      where: {
        status: 'PENDING',
      },
    })

    // Get total revenue
    const totalRevenueResult = await prisma.payment.aggregate({
      where: {
        status: 'SUCCESS',
      },
      _sum: {
        amount: true,
      },
    })
    const totalRevenue = totalRevenueResult._sum.amount || 0

    // Get monthly revenue
    const firstDayOfMonth = new Date()
    firstDayOfMonth.setDate(1)
    firstDayOfMonth.setHours(0, 0, 0, 0)

    const monthlyRevenueResult = await prisma.payment.aggregate({
      where: {
        status: 'SUCCESS',
        createdAt: {
          gte: firstDayOfMonth,
        },
      },
      _sum: {
        amount: true,
      },
    })
    const monthlyRevenue = monthlyRevenueResult._sum.amount || 0

    // Get memberships expiring in 30 days
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    const expiringThisMonth = await prisma.membership.count({
      where: {
        status: 'ACTIVE',
        expiresAt: {
          gte: new Date(),
          lte: thirtyDaysFromNow,
        },
      },
    })

    return NextResponse.json({
      totalMembers,
      activeMembers,
      expiredMembers,
      pendingPayments,
      totalRevenue,
      monthlyRevenue,
      expiringThisMonth,
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
