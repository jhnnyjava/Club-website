import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all users with membership data
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        membership: {
          select: {
            status: true,
            startedAt: true,
            expiresAt: true,
          },
        },
        payments: {
          where: {
            status: 'SUCCESS',
          },
          select: {
            amount: true,
            type: true,
            mpesaReceiptNumber: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Generate CSV
    const csvRows = [
      // Header
      [
        'Name',
        'Email',
        'Phone',
        'Membership Status',
        'Started At',
        'Expires At',
        'Total Payments',
        'Last Payment Amount',
        'Last Payment Date',
        'Last Receipt Number',
        'Joined Date',
      ].join(','),
      // Data rows
      ...users.map((user) => {
        const lastPayment = user.payments[0]
        const totalPayments = user.payments.reduce((sum, p) => sum + p.amount, 0)

        return [
          `"${user.name || ''}"`,
          `"${user.email}"`,
          `"${user.phone || ''}"`,
          `"${user.membership?.status || 'PENDING'}"`,
          `"${user.membership?.startedAt?.toISOString() || ''}"`,
          `"${user.membership?.expiresAt?.toISOString() || ''}"`,
          totalPayments,
          lastPayment?.amount || 0,
          `"${lastPayment?.createdAt?.toISOString() || ''}"`,
          `"${lastPayment?.mpesaReceiptNumber || ''}"`,
          `"${user.createdAt.toISOString()}"`,
        ].join(',')
      }),
    ]

    const csv = csvRows.join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="iec-members-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Error exporting CSV:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
