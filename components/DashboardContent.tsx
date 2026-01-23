'use client'

import { useState } from 'react'
import { User, Membership, Payment } from '@prisma/client'
import { formatCurrency, getDaysUntilExpiry, formatPhoneNumber } from '@/lib/utils'
import { Calendar, CreditCard, Phone, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react'

type UserWithRelations = User & {
  membership: Membership | null
  payments: Payment[]
}

export default function DashboardContent({ user }: { user: UserWithRelations }) {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(user.phone || '')

  const membership = user.membership
  const isActive = membership?.status === 'ACTIVE'
  const isPending = membership?.status === 'PENDING'
  const daysUntilExpiry = membership?.expiresAt ? getDaysUntilExpiry(membership.expiresAt) : 0

  const handlePayment = async (type: 'MEMBERSHIP' | 'RENEWAL') => {
    setIsPaymentLoading(true)
    setPaymentError('')
    setPaymentSuccess(false)

    const amount = type === 'MEMBERSHIP' ? 500 : 250

    try {
      const response = await fetch('/api/payments/create-stk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          amount,
          type,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed')
      }

      setPaymentSuccess(true)
      
      // Poll for payment status
      const checkPaymentStatus = async () => {
        const statusResponse = await fetch(`/api/payments/status?paymentId=${data.paymentId}`)
        const statusData = await statusResponse.json()

        if (statusData.status === 'SUCCESS') {
          window.location.reload()
        } else if (statusData.status === 'FAILED') {
          setPaymentError('Payment failed. Please try again.')
          setPaymentSuccess(false)
        } else {
          setTimeout(checkPaymentStatus, 3000)
        }
      }

      setTimeout(checkPaymentStatus, 5000)
    } catch (err: any) {
      setPaymentError(err.message || 'Payment failed. Please try again.')
    } finally {
      setIsPaymentLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIVE: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      EXPIRED: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-gray-100 text-gray-800',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    )
  }

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="text-green-600" size={20} />
      case 'FAILED':
        return <XCircle className="text-red-600" size={20} />
      case 'PENDING':
        return <Clock className="text-yellow-600" size={20} />
      default:
        return <Clock className="text-gray-600" size={20} />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Membership Status Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Membership Status</h2>
          {membership && getStatusBadge(membership.status)}
        </div>

        {isActive && membership.expiresAt && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-900">
              Your membership expires in <strong>{daysUntilExpiry} days</strong> on{' '}
              <strong>{new Date(membership.expiresAt).toLocaleDateString()}</strong>
            </p>
            {daysUntilExpiry <= 30 && (
              <p className="text-sm text-blue-700 mt-2">
                Renew now for only 250 KES (50% discount!)
              </p>
            )}
          </div>
        )}

        {isPending && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-900">
              Complete your payment of <strong>500 KES</strong> to activate your membership.
            </p>
          </div>
        )}

        {/* Payment Form */}
        {(!isActive || (daysUntilExpiry <= 30 && daysUntilExpiry > 0)) && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">
              {isPending ? 'Activate Membership' : 'Renew Membership'}
            </h3>

            {paymentError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {paymentError}
              </div>
            )}

            {paymentSuccess && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                Payment initiated! Check your phone for the M-Pesa prompt.
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                M-Pesa Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0712345678"
                />
              </div>
            </div>

            <button
              onClick={() => handlePayment(isPending ? 'MEMBERSHIP' : 'RENEWAL')}
              disabled={isPaymentLoading || !phoneNumber}
              className="w-full flex justify-center items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-md hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPaymentLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2" size={20} />
                  Pay {isPending ? '500' : '250'} KES via M-Pesa
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>

        {user.payments.length === 0 ? (
          <p className="text-gray-500">No payments yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {user.payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {payment.type}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getPaymentStatusIcon(payment.status)}
                        <span className="text-sm">{payment.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {payment.mpesaReceiptNumber || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
