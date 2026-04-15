"use client";

import Link from "next/link";
import { Scissors, Globe, ExternalLink } from "lucide-react";
import { useContent } from "@/lib/useContent";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Footer() {
  const content = useContent();
  const { brand, navigation } = content;

  return (
    <footer className="bg-charcoal text-white/80">
      <AnimatedSection direction="up" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Scissors className="w-5 h-5 text-gold" />
              <span className="font-serif text-xl font-bold text-white">
                {brand.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed">{brand.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-white text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-white text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>{brand.address.street}</li>
              <li>
                {brand.address.city}, {brand.address.state} {brand.address.zip}
              </li>
              <li className="pt-2">
                <a
                  href={`tel:${brand.phone}`}
                  className="hover:text-gold transition-colors"
                >
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-white text-lg mb-4">Hours</h4>
            <ul className="space-y-1 text-sm">
              {brand.hours.map((h) => (
                <li key={h.day} className="flex justify-between">
                  <span>{h.day}</span>
                  <span>
                    {h.open} – {h.close}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {brand.social.instagram && (
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
            {brand.social.facebook && (
              <a
                href={brand.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </AnimatedSection>
    </footer>
  );
}
