import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold mb-3 tracking-tight">IEC</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-prose">
              Innovation and Entrepreneurship Club at JKUAT. 
              We promote the development, recognition, and responsible dissemination 
              of ideas that solve real-world problems.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-ice-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-slate-400 hover:text-ice-white transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-ice-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-ice-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Contact</h4>
            <p className="text-sm text-slate-400">
              <a 
                href="mailto:iecjkuat@gmail.com" 
                className="hover:text-ice-cyan transition-colors"
              >
                iecjkuat@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} IEC JKUAT. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
