'use client'

import Link from 'next/link'
import { MapPin, Mail, Phone, Globe, ArrowUp } from 'lucide-react'

interface FooterLink {
  label: string
  href: string
  badge?: string
}

interface FooterSectionProps {
  aboutHeading: string
  aboutText: string
  companyHeading: string
  companyLinks: FooterLink[]
  contactHeading: string
  address: string
  emails: string[]
  phones: string[]
  website: string
  websiteUrl: string
  copyright: string
}

export default function FooterSection({
  aboutHeading,
  aboutText,
  companyHeading,
  companyLinks,
  contactHeading,
  address,
  emails,
  phones,
  website,
  websiteUrl,
  copyright
}: FooterSectionProps) {

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-[#020617] text-gray-400 relative border-t border-slate-800/50 pb-8">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* ABOUT */}
          <div>
            <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-sm">
              {aboutHeading}
            </h4>

            <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm font-light">
              {aboutText}
            </p>
          </div>

          {/* COMPANY LINKS */}
          <div>

            <h4 className="font-bold text-white mb-5 tracking-wider uppercase text-sm">
              {companyHeading}
            </h4>

            <ul className="space-y-3">

              {companyLinks.map((link, idx) => (

                <li key={idx}>

                  <Link
                    href={link.href}
                    className="text-gray-400 text-[15px] hover:text-secondary hover:drop-shadow-[0_0_8px_rgba(28,217,198,0.5)] transition-all flex items-center gap-2"
                  >
                    {link.label}

                    {link.badge && (
                      <span className="inline-block bg-slate-800 border border-slate-700 text-secondary text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}

                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <h4 className="font-bold text-white mb-5 tracking-wider uppercase text-sm">
              {contactHeading}
            </h4>

            <ul className="space-y-5">

              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-[15px] leading-relaxed font-light">
                  {address}
                </span>
              </li>

              {/* Emails */}
              <li className="flex items-start gap-4">
                <Mail size={18} className="text-secondary mt-0.5 flex-shrink-0" />

                <div className="flex flex-col gap-1.5">

                  {emails.map((email, idx) => (
                    <a
                      key={idx}
                      href={`mailto:${email}`}
                      className="text-gray-400 text-[15px] hover:text-secondary transition-colors font-light"
                    >
                      {email}
                    </a>
                  ))}

                </div>
              </li>

              {/* Phones */}
              <li className="flex items-start gap-4">
                <Phone size={18} className="text-secondary mt-0.5 flex-shrink-0" />

                <div className="flex flex-col gap-1.5">

                  {phones.map((phone, idx) => (
                    <span key={idx} className="text-gray-400 text-[15px] font-light">
                      {phone}
                    </span>
                  ))}

                </div>
              </li>

              {/* Website */}
              <li className="flex items-center gap-4">
                <Globe size={18} className="text-secondary flex-shrink-0" />

                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-[15px] hover:text-secondary transition-colors font-light"
                >
                  {website}
                </a>

              </li>

            </ul>

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-slate-800/50 pt-8 mt-4">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm font-light">
            {copyright}
          </p>

          <div>

            <a href="https://www.freecounterstat.com" title="website counter">
              <img src="https://counter1.optistats.ovh/private/freecounterstat.php?c=yt6tp3qursdg24ncu9azej1gxdw6rseh" title="website counter" alt="website counter" className="border-0" />
            </a>
          </div>
        </div>

      </div>

      {/* BACK TO TOP */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 w-12 h-12 bg-slate-800 border border-slate-700 text-secondary rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:border-secondary hover:shadow-[0_0_15px_rgba(28,217,198,0.3)] transition-all z-40"
      >
        <ArrowUp size={20} />
      </button>

    </footer>
  )
}