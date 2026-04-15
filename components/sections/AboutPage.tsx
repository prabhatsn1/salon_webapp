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
      <section className="bg-charcoal relative flex h-[70vh] items-center justify-center overflow-hidden">
        <div className="from-charcoal/60 to-charcoal absolute inset-0 bg-gradient-to-b" />
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.p
            className="text-gold mb-4 text-sm tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {about.story.subheading}
          </motion.p>
          <motion.h1
            className="mb-6 font-serif text-5xl text-white md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {about.story.heading}
          </motion.h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
          <AnimatedSection direction="left">
            <p className="text-charcoal/70 text-lg leading-relaxed">
              {about.story.text}
            </p>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={about.story.image}
                alt={about.story.heading}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="from-gold/10 absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream-dark py-24">
        <AnimatedSection direction="up" className="mb-16 text-center">
          <h2 className="text-charcoal font-serif text-4xl md:text-5xl">
            Our Journey
          </h2>
        </AnimatedSection>

        <div ref={timelineRef} className="relative mx-auto max-w-4xl px-6">
          {/* Timeline line */}
          <div className="bg-charcoal/10 absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2">
            {!shouldReduce && (
              <motion.div
                className="bg-gold w-full origin-top"
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
                  : "md:ml-auto md:pl-16 md:text-left"
              }`}
            >
              {/* Dot */}
              <div
                className={`bg-gold border-cream-dark absolute top-2 z-10 h-4 w-4 rounded-full border-4 ${
                  i % 2 === 0
                    ? "right-0 left-auto md:-right-2"
                    : "left-0 md:-left-2"
                } hidden md:block`}
                style={{ transform: "translateX(50%)" }}
              />
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <span className="text-gold font-serif text-xl font-bold">
                  {event.year}
                </span>
                <h3 className="text-charcoal mt-1 mb-2 font-serif text-lg">
                  {event.title}
                </h3>
                <p className="text-charcoal/60 text-sm">{event.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-charcoal py-24">
        <AnimatedSection
          direction="up"
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <h2 className="mb-6 font-serif text-4xl text-white md:text-5xl">
            {about.mission.heading}
          </h2>
          <p className="text-lg leading-relaxed text-white/70">
            {about.mission.text}
          </p>
        </AnimatedSection>
      </section>

      {/* Values */}
      <section className="bg-cream py-24">
        <AnimatedSection direction="up" className="mb-16 text-center">
          <h2 className="text-charcoal font-serif text-4xl md:text-5xl">
            Our Values
          </h2>
        </AnimatedSection>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-4">
          {about.values.map((value, i) => {
            const Icon = iconMap[value.icon] || Palette;
            return (
              <AnimatedSection
                key={value.title}
                direction="rotate3d"
                delay={i * 0.1}
              >
                <div className="h-full rounded-2xl bg-white p-8 text-center shadow-md">
                  <div className="bg-gold/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                    <Icon className="text-gold h-7 w-7" />
                  </div>
                  <h3 className="text-charcoal mb-2 font-serif text-lg">
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
      <section className="bg-cream-dark py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
          <AnimatedSection direction="left">
            <h2 className="text-charcoal mb-6 font-serif text-3xl md:text-4xl">
              {about.sustainability.heading}
            </h2>
            <p className="text-charcoal/70 mb-6 leading-relaxed">
              {about.sustainability.text}
            </p>
            <div className="flex flex-wrap gap-3">
              {about.sustainability.certifications.map((cert) => (
                <span
                  key={cert}
                  className="bg-gold/10 text-gold-dark rounded-full px-4 py-2 text-xs font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <img
                src={about.sustainability.image}
                alt={about.sustainability.heading}
                className="h-full w-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Awards Marquee */}
      <section className="bg-charcoal overflow-hidden py-16">
        <AnimatedSection direction="up" className="mb-10 text-center">
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
              <div key={i} className="flex-shrink-0 px-8 text-center">
                <p className="text-gold font-serif text-lg">{award.title}</p>
                <p className="text-sm text-white/40">
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
