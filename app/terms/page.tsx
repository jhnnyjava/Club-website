import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: January 18, 2026</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the IEC JKUAT membership platform, you agree to be bound by these
                Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Membership</h2>
              <p>
                Membership is open to all JKUAT students and alumni. By purchasing a membership, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Pay the required membership fee (500 KES initial, 250 KES renewal)</li>
                <li>Maintain the confidentiality of your account</li>
                <li>Comply with the club's code of conduct</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Payment Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All payments are processed through M-Pesa</li>
                <li>Membership is valid for 30 days from the date of payment</li>
                <li>Renewal reminders are sent 30 days before expiration</li>
                <li>Payments are non-refundable except as required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service for any illegal purpose</li>
                <li>Violate any laws or regulations</li>
                <li>Harass, abuse, or harm others</li>
                <li>Share your account credentials with others</li>
                <li>Attempt to gain unauthorized access to the system</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the platform are owned by IEC JKUAT and are
                protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your membership and access to the platform at
                our sole discretion, without notice, for conduct that we believe violates these Terms or is
                harmful to other users or the club.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Disclaimer</h2>
              <p>
                The service is provided "as is" without warranties of any kind. We do not guarantee
                uninterrupted or error-free service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p>
                IEC JKUAT shall not be liable for any indirect, incidental, special, or consequential damages
                arising out of or relating to your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material
                changes via email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
              <p>
                For questions about these Terms, please contact us at{' '}
                <a href="mailto:iecjkuat@gmail.com" className="text-primary-600 hover:underline">
                  iecjkuat@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
