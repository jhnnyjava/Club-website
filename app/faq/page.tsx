'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    category: 'Membership',
    questions: [
      {
        q: 'How much does membership cost?',
        a: 'Initial membership costs 500 KES for 30 days. Renewal is available at 250 KES (50% discount).',
      },
      {
        q: 'How long does my membership last?',
        a: 'Membership is valid for 30 days from the date of payment. You can renew before expiration to maintain continuous access.',
      },
      {
        q: 'Can I renew my membership early?',
        a: 'Yes! You can renew at any time. Your new 30-day period will start after your current membership expires.',
      },
      {
        q: 'What happens if my membership expires?',
        a: 'Your membership will be marked as expired and you will lose access to exclusive resources. You can renew at any time to regain access.',
      },
    ],
  },
  {
    category: 'Payments',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We currently accept M-Pesa payments only. This makes it easy and secure for all members in Kenya.',
      },
      {
        q: 'How do I pay via M-Pesa?',
        a: 'After signing up or logging in, click the "Pay via M-Pesa" button, enter your M-Pesa phone number, and follow the prompt on your phone to complete the payment.',
      },
      {
        q: 'Will I receive a receipt?',
        a: 'Yes! You will receive a payment receipt via email immediately after successful payment, and you can also view all your payment history in your dashboard.',
      },
      {
        q: 'What if my payment fails?',
        a: 'If your payment fails, you will receive an error message. Please try again or contact us at iecjkuat@gmail.com if the problem persists.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes! All payments are processed securely through Safaricom M-Pesa. We do not store your M-Pesa PIN or any sensitive payment information.',
      },
    ],
  },
  {
    category: 'Benefits',
    questions: [
      {
        q: 'What do I get with membership?',
        a: 'Members get access to workshops, events, mentorship programs, networking opportunities, resource library, and participation in competitions.',
      },
      {
        q: 'Can I attend events without being a member?',
        a: 'Some public events may be open to non-members, but most exclusive workshops and resources require active membership.',
      },
      {
        q: 'How often are events held?',
        a: 'We organize weekly meetups, monthly workshops, and quarterly competitions. Check your dashboard for the latest event schedule.',
      },
    ],
  },
  {
    category: 'Account',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click "Join Now" or "Sign Up", fill in your details including name, email, phone number, and password, then submit. You can then proceed to pay for membership.',
      },
      {
        q: 'I forgot my password. What should I do?',
        a: 'Click "Forgot Password" on the sign-in page and follow the instructions to reset your password.',
      },
      {
        q: 'Can I change my phone number?',
        a: 'Yes, you can update your phone number in your dashboard settings.',
      },
      {
        q: 'How do I delete my account?',
        a: 'Please contact us at iecjkuat@gmail.com to request account deletion.',
      },
    ],
  },
  {
    category: 'Support',
    questions: [
      {
        q: 'How can I contact support?',
        a: 'You can email us at iecjkuat@gmail.com or visit the Contact page to send us a message.',
      },
      {
        q: 'When will I receive renewal reminders?',
        a: 'We send automatic email reminders 30 days before your membership expires, offering the discounted renewal rate.',
      },
      {
        q: 'Can I get a refund?',
        a: 'Due to the nature of digital membership, we do not offer refunds. However, if you experience any issues, please contact us and we will do our best to help.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about IEC membership
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {faqs.map((category, catIndex) => (
              <div key={catIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, qIndex) => {
                    const key = `${catIndex}-${qIndex}`
                    const isOpen = openItems[key]

                    return (
                      <div key={key} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900">{faq.q}</span>
                          {isOpen ? (
                            <ChevronUp className="text-primary-600 flex-shrink-0" size={20} />
                          ) : (
                            <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 text-gray-700">
                            <p>{faq.a}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-700 mb-8">
              We're here to help! Contact us and we'll get back to you as soon as possible.
            </p>
            <a
              href="mailto:iecjkuat@gmail.com"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Contact Support
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
