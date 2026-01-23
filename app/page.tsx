import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PricingCard } from '@/components/ui/PricingCard';
import Link from 'next/link';
import { ArrowRight, Lightbulb, Users, Rocket, TrendingUp, Check } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 text-balance">
              Where innovation meets execution.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl">
              IEC promotes the development, recognition, and responsible dissemination 
              of ideas that solve real-world problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button variant="primary" size="lg">
                  Become a Member – KES 500
                </Button>
              </Link>
              <Link href="/membership">
                <Button variant="secondary" size="lg">
                  View Benefits
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle grid background */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
              backgroundSize: '100px 100px'
            }}
          />
        </div>
      </section>

      {/* Stats Section */}
      <Section className="py-16 border-y border-slate-800/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '500+', label: 'Active Members' },
            { value: '50+', label: 'Events Hosted' },
            { value: '100+', label: 'Startups Launched' },
            { value: '20+', label: 'Industry Partners' },
          ].map((stat, index) => (
            <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="text-4xl md:text-5xl font-extrabold text-ice-cyan mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* What We Do */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for innovators
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            IEC provides the infrastructure, community, and resources to turn your ideas into market-ready solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Lightbulb,
              title: 'Ideation',
              description: 'Structured frameworks to validate and refine your concepts with expert guidance.',
            },
            {
              icon: Users,
              title: 'Community',
              description: 'Connect with peers, mentors, and industry leaders building the future.',
            },
            {
              icon: Rocket,
              title: 'Execution',
              description: 'Access tools, funding opportunities, and partnerships to scale your venture.',
            },
          ].map((item, index) => (
            <Card key={index} hover className="p-8">
              <div className="w-12 h-12 bg-ice-cyan/10 rounded-xl flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-ice-cyan" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-slate-950/50">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Membership that compounds
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Your IEC membership is an investment in your future. Every resource, connection, 
              and opportunity is designed to accelerate your growth trajectory.
            </p>
            <ul className="space-y-4">
              {[
                'Weekly workshops with industry practitioners',
                'Exclusive access to coworking spaces and labs',
                'Pitch competitions with real funding',
                'Direct mentorship from successful founders',
                'Network with 500+ ambitious builders',
                'Early access to partnership opportunities',
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-ice-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <PricingCard
              title="Full Membership"
              price={500}
              period="30 days"
              features={[
                'All workshops and events',
                'Coworking space access',
                'Mentorship programs',
                'Pitch competition eligibility',
                'Community Slack access',
                'Resource library',
                'Renewal: KES 250/month',
              ]}
              isPopular
              ctaText="Join Now"
              onCTAClick={() => {
                window.location.href = '/auth/signup';
              }}
            />
          </div>
        </div>
      </Section>

      {/* Social Proof */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proven track record
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Our members have gone on to raise funding, win competitions, and build products used by thousands.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              metric: 'KES 50M+',
              label: 'Raised by alumni',
            },
            {
              metric: '15+',
              label: 'Competition wins',
            },
            {
              metric: '98%',
              label: 'Member satisfaction',
            },
          ].map((item, index) => (
            <Card key={index} className="p-8 text-center">
              <div className="text-4xl font-bold text-ice-cyan mb-2">{item.metric}</div>
              <div className="text-slate-400">{item.label}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-y border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to build something that matters?
          </h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            Join IEC and surround yourself with the people, resources, and opportunities 
            that will define your entrepreneurial journey.
          </p>
          <Link href="/auth/signup">
            <Button variant="primary" size="lg" className="group">
              Start Your Membership
              <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="text-sm text-slate-500 mt-6">
            30-day membership • Secure M-Pesa payment • Cancel anytime
          </p>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
