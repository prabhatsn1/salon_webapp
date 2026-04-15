"use client";

import { motion } from "framer-motion";
import { Globe, ExternalLink } from "lucide-react";
import { useContent } from "@/lib/useContent";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function TeamPage() {
  const content = useContent();
  const { team } = content;

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal relative flex h-[50vh] items-center justify-center overflow-hidden">
        <div className="from-charcoal/80 to-charcoal absolute inset-0 bg-gradient-to-b" />
        <div className="relative z-10 px-6 text-center">
          <motion.h1
            className="mb-4 font-serif text-5xl text-white md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {team.page_heading}
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-cream py-16">
        <AnimatedSection
          direction="up"
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <p className="text-charcoal/70 text-lg leading-relaxed">
            {team.intro}
          </p>
        </AnimatedSection>
      </section>

      {/* Team Grid */}
      <section className="bg-cream-dark py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member, i) => (
            <AnimatedSection key={member.name} direction="up" delay={i * 0.1}>
              <div className="group perspective-1000">
                <div className="preserve-3d relative aspect-[3/4] w-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-lg backface-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="from-charcoal absolute right-0 bottom-0 left-0 bg-gradient-to-t to-transparent p-6">
                      <h3 className="font-serif text-xl text-white">
                        {member.name}
                      </h3>
                      <p className="text-gold text-sm">{member.role}</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="bg-charcoal absolute inset-0 flex [transform:rotateY(180deg)] flex-col justify-between rounded-2xl p-8 backface-hidden">
                    <div>
                      <h3 className="mb-2 font-serif text-xl text-white">
                        {member.name}
                      </h3>
                      <p className="text-gold mb-4 text-sm">{member.role}</p>
                      <p className="mb-4 text-sm leading-relaxed text-white/70">
                        {member.bio}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((s) => (
                          <span
                            key={s}
                            className="bg-gold/15 text-gold rounded-full px-3 py-1 text-xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          className="hover:text-gold text-white/50 transition-colors"
                          aria-label="Instagram"
                        >
                          <Globe className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="hover:text-gold text-white/50 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
