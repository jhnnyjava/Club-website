import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Rocket, Users, Lightbulb, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Innovation & Entrepreneurship Club
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Join JKUAT's premier community of innovators and entrepreneurs. 
              Transform your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Join Now - 500 KES
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Join ICE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation Workshops</h3>
              <p className="text-gray-600">
                Access exclusive workshops on design thinking, prototyping, and product development.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-secondary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="text-secondary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Networking</h3>
              <p className="text-gray-600">
                Connect with like-minded entrepreneurs, mentors, and industry leaders.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
              <p className="text-gray-600">
                Get guidance from experienced entrepreneurs and business professionals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-secondary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Rocket className="text-secondary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Launch Support</h3>
              <p className="text-gray-600">
                Resources and support to help launch and scale your startup ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a Member Today</h2>
              <p className="text-xl mb-8">
                For only <span className="text-3xl font-bold">500 KES</span>, get 30 days of exclusive access
              </p>
              <ul className="text-left inline-block mb-8 space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle size={24} />
                  <span>Access to all workshops and events</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={24} />
                  <span>Mentorship programs</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={24} />
                  <span>Networking opportunities</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={24} />
                  <span>Resource library access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle size={24} />
                  <span>Renewal at only 250 KES</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Get Started <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  href="/membership"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Startups Launched</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
