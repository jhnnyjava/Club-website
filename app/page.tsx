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
    <div className="min-h-screen flex flex-col noise-bg relative overflow-hidden">
      <Navbar />

      {/* Hero Section with Premium Design */}
      <section className="relative pt-40 pb-32 md:pt-48 md:pb-40">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-300">
                500+ innovators building the future
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl xl:text-8xl font-extrabold tracking-tight mb-8 animate-fade-in leading-[1.1]">
              Where{' '}
              <span className="gradient-text animate-glow">
                innovation
              </span>
              <br />
              meets execution
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              IEC JKUAT empowers students to transform ideas into impactful solutions 
              through mentorship, resources, and a thriving community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link href="/auth/signup">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all text-lg px-8"
                >
                  Start Your Journey – KES 500
                </Button>
              </Link>
              <Link href="/membership">
                <Button variant="secondary" size="lg" className="glass-card hover:glass-card-hover text-lg px-8">
                  Explore Benefits
                </Button>
              </Link>
            </div>

            <p className="text-sm text-slate-500 mt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              ✓ 30-day access · ✓ Secure M-Pesa payment · ✓ Join 500+ members
            </p>
          </div>
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
            }}
          />
        </div>
      </section>

      {/* Stats Section with Glass Effect */}
      <Section className="py-20 relative">
        <div className="glass-card rounded-3xl p-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '500+', label: 'Active Members', icon: Users },
              { value: '50+', label: 'Events Hosted', icon: Rocket },
              { value: '100+', label: 'Startups Launched', icon: TrendingUp },
              { value: '20+', label: 'Industry Partners', icon: Lightbulb },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center group animate-slide-up relative" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What We Do - Premium Cards */}
      <Section className="py-24">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-semibold text-blue-400 mb-4">
            Our Focus Areas
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Built for{' '}
            <span className="gradient-text">innovators</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We provide the infrastructure, community, and resources to turn your ideas into market-ready solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Lightbulb,
              title: 'Ideation',
              description: 'Structured frameworks to validate and refine your concepts with expert guidance and peer feedback.',
              gradient: 'from-blue-500/10 to-indigo-500/10',
              iconColor: 'text-blue-400',
            },
            {
              icon: Users,
              title: 'Community',
              description: 'Connect with ambitious peers, experienced mentors, and industry leaders building the future.',
              gradient: 'from-cyan-500/10 to-teal-500/10',
              iconColor: 'text-cyan-400',
            },
            {
              icon: Rocket,
              title: 'Execution',
              description: 'Access tools, funding opportunities, and strategic partnerships to scale your venture.',
              gradient: 'from-purple-500/10 to-pink-500/10',
              iconColor: 'text-purple-400',
            },
          ].map((item, index) => (
            <div 
              key={index} 
              className="group glass-card hover:glass-card-hover p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 animate-slide-up relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity -z-10`} />
              
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className={`w-7 h-7 ${item.iconColor}`} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.description}</p>
              
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits Section - Enhanced Premium Design */}
      <Section className="py-24 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-semibold text-cyan-400 mb-6">
              Membership Benefits
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Membership that{' '}
              <span className="gradient-text">compounds</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Your IEC membership is an investment in your future. Every resource, connection, 
              and opportunity accelerates your growth trajectory.
            </p>
            
            <ul className="space-y-5">
              {[
                'Weekly workshops with industry practitioners',
                'Exclusive coworking spaces and innovation labs',
                'Pitch competitions with real funding opportunities',
                'Direct mentorship from successful founders',
                'Network with 500+ ambitious builders',
                'Early access to partnership opportunities',
              ].map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-4 group animate-slide-up" 
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-300 text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card p-10 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {/* Popular badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold mb-6">
                  <span>⭐</span> Most Popular
                </div>
                
                <h3 className="text-3xl font-extrabold mb-3 text-white">Full Membership</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-6xl font-extrabold gradient-text">500</span>
                  <span className="text-2xl text-slate-400">KES</span>
                  <span className="text-slate-500">/30 days</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {[
                    'All workshops and events',
                    'Coworking space access',
                    'Mentorship programs',
                    'Pitch competition eligibility',
                    'Community Slack access',
                    'Resource library',
                    'Renewal: KES 250/month',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/signup" className="block">
                  <button className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all text-lg">
                    Join Now
                  </button>
                </Link>

                <p className="text-center text-sm text-slate-500 mt-4">
                  Secure M-Pesa payment • Cancel anytime
                </p>
              </div>
            </div>
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

      {/* Final CTA - Premium Glass Design */}
      <Section className="py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="glass-card p-16 rounded-3xl">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Ready to build something{' '}
              <span className="gradient-text">that matters?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              Join IEC and surround yourself with the people, resources, and opportunities 
              that will define your entrepreneurial journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all text-lg px-10 py-6 group"
                >
                  Start Your Membership
                  <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg" className="glass-card hover:glass-card-hover text-lg px-10 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-10 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>30-day access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
