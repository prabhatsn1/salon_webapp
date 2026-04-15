"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Palette, Trophy, Users, Leaf } from "lucide-react";
import { useContent } from "@/lib/useContent";
import AnimatedSection from "@/components/ui/AnimatedSection";

const iconMap: Record<string, React.ElementType> = {
  Palette,
  Trophy,
  Users,
  Leaf,
};

export default function AboutPage() {
  const content = useContent();
  const { about } = content;
  const shouldReduce = useReducedMotion();

  // Timeline line-draw
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal" />
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.p
            className="text-gold text-sm tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {about.story.subheading}
          </motion.p>
          <motion.h1
            className="font-serif text-5xl md:text-7xl text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {about.story.heading}
          </motion.h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <p className="text-lg text-charcoal/70 leading-relaxed">
              {about.story.text}
            </p>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className="aspect-[4/5] rounded-2xl shadow-2xl relative overflow-hidden">
              <img
                src={about.story.image}
                alt={about.story.heading}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-cream-dark">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            Our Journey
          </h2>
        </AnimatedSection>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto px-6">
          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-charcoal/10">
            {!shouldReduce && (
              <motion.div
                className="w-full bg-gold origin-top"
                style={{ scaleY: lineScaleY, height: "100%" }}
              />
            )}
          </div>

          {about.timeline.map((event, i) => (
            <AnimatedSection
              key={event.year}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.1}
              className={`relative mb-16 md:w-1/2 ${
                i % 2 === 0
                  ? "md:pr-16 md:text-right"
                  : "md:pl-16 md:text-left md:ml-auto"
              }`}
            >
              {/* Dot */}
              <div
                className={`absolute top-2 w-4 h-4 bg-gold rounded-full border-4 border-cream-dark z-10 ${
                  i % 2 === 0
                    ? "right-0 md:-right-2 left-auto"
                    : "left-0 md:-left-2"
                } hidden md:block`}
                style={{ transform: "translateX(50%)" }}
              />
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <span className="text-gold font-serif text-xl font-bold">
                  {event.year}
                </span>
                <h3 className="font-serif text-lg text-charcoal mt-1 mb-2">
                  {event.title}
                </h3>
                <p className="text-charcoal/60 text-sm">{event.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-charcoal">
        <AnimatedSection
          direction="up"
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            {about.mission.heading}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            {about.mission.text}
          </p>
        </AnimatedSection>
      </section>

      {/* Values */}
      <section className="py-24 bg-cream">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            Our Values
          </h2>
        </AnimatedSection>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {about.values.map((value, i) => {
            const Icon = iconMap[value.icon] || Palette;
            return (
              <AnimatedSection
                key={value.title}
                direction="rotate3d"
                delay={i * 0.1}
              >
                <div className="bg-white rounded-2xl p-8 shadow-md text-center h-full">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg text-charcoal mb-2">
                    {value.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
              {about.sustainability.heading}
            </h2>
            <p className="text-charcoal/70 leading-relaxed mb-6">
              {about.sustainability.text}
            </p>
            <div className="flex flex-wrap gap-3">
              {about.sustainability.certifications.map((cert) => (
                <span
                  key={cert}
                  className="text-xs bg-gold/10 text-gold-dark px-4 py-2 rounded-full font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className="aspect-[4/3] rounded-2xl shadow-xl overflow-hidden">
              <img
                src={about.sustainability.image}
                alt={about.sustainability.heading}
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Awards Marquee */}
      <section className="py-16 bg-charcoal overflow-hidden">
        <AnimatedSection direction="up" className="text-center mb-10">
          <h2 className="font-serif text-3xl text-white">
            Awards & Recognition
          </h2>
        </AnimatedSection>
        <div className="relative">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={shouldReduce ? {} : { x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...about.awards, ...about.awards].map((award, i) => (
              <div key={i} className="flex-shrink-0 text-center px-8">
                <p className="text-gold font-serif text-lg">{award.title}</p>
                <p className="text-white/40 text-sm">
                  {award.source} · {award.year}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
