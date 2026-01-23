import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Target, Eye, Users, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About ICE JKUAT</h1>
            <p className="text-xl text-gray-100">
              Empowering the next generation of innovators and entrepreneurs
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Target className="text-primary-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  To foster a culture of innovation and entrepreneurship among JKUAT students by providing 
                  resources, mentorship, and opportunities to transform ideas into viable businesses and 
                  impactful solutions.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Eye className="text-secondary-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">
                  To be the leading innovation and entrepreneurship club in Kenya, producing successful 
                  entrepreneurs and innovators who contribute to economic growth and social development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="text-primary-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2">Workshops & Training</h3>
                <p className="text-gray-600">
                  Regular workshops on design thinking, business planning, pitching, and technical skills 
                  development.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Award className="text-primary-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2">Competitions</h3>
                <p className="text-gray-600">
                  Organize and participate in innovation challenges, hackathons, and pitch competitions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Target className="text-primary-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
                <p className="text-gray-600">
                  Connect members with experienced entrepreneurs, industry experts, and successful alumni.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bylaws Summary */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Club Bylaws Summary</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Membership</h3>
                  <p className="text-gray-700">
                    Membership is open to all JKUAT students and alumni. A membership fee of 500 KES grants 
                    30 days of access to all club resources and events. Renewal is available at 250 KES.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Code of Conduct</h3>
                  <p className="text-gray-700">
                    Members are expected to maintain professionalism, respect diversity, collaborate 
                    constructively, and uphold the club's values of innovation and integrity.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Activities</h3>
                  <p className="text-gray-700">
                    The club organizes weekly meetups, monthly workshops, quarterly competitions, and 
                    annual innovation summits.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Governance</h3>
                  <p className="text-gray-700">
                    The club is governed by an elected executive committee consisting of President, 
                    Vice President, Secretary, Treasurer, and departmental heads.
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
