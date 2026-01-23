import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { CheckCircle, Calendar, DollarSign, Repeat } from 'lucide-react'

export default function MembershipPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Membership Plans</h1>
            <p className="text-xl text-gray-100">
              Choose the plan that works for you
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Initial Membership */}
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-primary-600 transform hover:scale-105 transition-transform">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">New Member</h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold text-primary-600">500</span>
                    <span className="text-gray-600 ml-2">KES</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>30 Days Access</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>Full access to all workshops and events</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>Mentorship program enrollment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>Networking opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>Resource library access</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>Competition participation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>ICE member certificate</span>
                  </li>
                </ul>

                <Link
                  href="/auth/signup"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Join Now
                </Link>
              </div>

              {/* Renewal */}
              <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-green-600 transform hover:scale-105 transition-transform">
                <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  50% OFF
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Renewal</h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold text-green-600">250</span>
                    <span className="text-gray-600 ml-2">KES</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>30 Days Extension</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>All benefits of initial membership</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>Exclusive renewal discount</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>Priority event registration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>Continued access to mentors</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>Alumni network access</span>
                  </li>
                  <li className="flex items-start">
                    <Repeat className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>Reminder sent 30 days before expiry</span>
                  </li>
                </ul>

                <Link
                  href="/dashboard"
                  className="block w-full text-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Renew Membership
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Info */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Payment Information</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <DollarSign className="text-primary-600 mr-2" size={24} />
                    M-Pesa Payment
                  </h3>
                  <p className="text-gray-700">
                    All payments are processed securely through M-Pesa. Simply enter your M-Pesa phone number 
                    and you'll receive a prompt on your phone to complete the payment.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">How It Works</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Create your account or sign in</li>
                    <li>Enter your M-Pesa phone number</li>
                    <li>Click "Pay via M-Pesa"</li>
                    <li>Enter your M-Pesa PIN on your phone</li>
                    <li>Receive instant confirmation and receipt</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Automatic Renewal Reminders</h3>
                  <p className="text-gray-700">
                    We'll send you an email reminder 30 days before your membership expires, giving you the 
                    option to renew at the discounted rate of 250 KES.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    <strong>Note:</strong> Membership is valid for 30 days from the date of payment. 
                    You can renew at any time before expiration to maintain continuous access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
