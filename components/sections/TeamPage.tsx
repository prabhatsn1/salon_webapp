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
      <section className="relative h-[50vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-charcoal" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="font-serif text-5xl md:text-7xl text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {team.page_heading}
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-cream">
        <AnimatedSection
          direction="up"
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <p className="text-lg text-charcoal/70 leading-relaxed">
            {team.intro}
          </p>
        </AnimatedSection>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.members.map((member, i) => (
            <AnimatedSection key={member.name} direction="up" delay={i * 0.1}>
              <div className="group perspective-1000">
                <div className="relative w-full aspect-[3/4] preserve-3d transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal to-transparent p-6">
                      <h3 className="font-serif text-xl text-white">
                        {member.name}
                      </h3>
                      <p className="text-gold text-sm">{member.role}</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl bg-charcoal p-8 flex flex-col justify-between [transform:rotateY(180deg)]">
                    <div>
                      <h3 className="font-serif text-xl text-white mb-2">
                        {member.name}
                      </h3>
                      <p className="text-gold text-sm mb-4">{member.role}</p>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">
                        {member.bio}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-gold/15 text-gold px-3 py-1 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          className="text-white/50 hover:text-gold transition-colors"
                          aria-label="Instagram"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="text-white/50 hover:text-gold transition-colors"
                          aria-label="LinkedIn"
                        >
                          <ExternalLink className="w-5 h-5" />
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
