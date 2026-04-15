"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Scissors,
  Palette,
  Crown,
  Sparkles,
  Award,
  Gem,
  Heart,
  Leaf,
  Star,
  Calendar,
  Quote,
} from "lucide-react";
import { useContent } from "@/lib/useContent";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card3D from "@/components/ui/Card3D";
import ParallaxLayer from "@/components/ui/ParallaxLayer";

const iconMap: Record<string, React.ElementType> = {
  Scissors,
  Palette,
  Crown,
  Sparkles,
  Award,
  Gem,
  Heart,
  Leaf,
  Star,
  Calendar,
};

/* ——— HERO ——— */
function HeroSection() {
  const content = useContent();
  const { hero } = content.home;
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-charcoal relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="from-charcoal/70 via-charcoal/50 to-charcoal absolute inset-0 z-10 bg-gradient-to-b" />
      <div className="absolute inset-0 bg-[url('/images/hero-salon.jpg')] bg-cover bg-center opacity-60" />

      {/* 3D floating element */}
      {!shouldReduce && (
        <motion.div
          className="border-gold/30 absolute top-1/3 right-[15%] z-10 h-32 w-32 rounded-full border-2"
          animate={{ rotateY: 360, rotateX: 15 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        />
      )}

      <div className="relative z-20 max-w-4xl px-6 text-center">
        <motion.h1
          className="mb-6 font-serif text-5xl leading-tight text-white md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg text-white/70 md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {hero.subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link
            href={hero.cta_link}
            className="bg-gold text-charcoal hover:bg-gold-light inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition-all hover:scale-105"
          >
            {hero.cta_text}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>

      {/* scroll indicator */}
      {!shouldReduce && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30 pt-2">
            <div className="bg-gold h-2 w-1 rounded-full" />
          </div>
        </motion.div>
      )}
    </section>
  );
}

/* ——— STATS ——— */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="text-gold font-serif text-4xl font-bold md:text-5xl"
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function StatsBar() {
  const content = useContent();
  return (
    <section className="bg-charcoal py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4">
        {content.home.stats.map((stat, i) => (
          <AnimatedSection key={i} direction="up" delay={i * 0.1}>
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm text-white/60">{stat.label}</p>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

/* ——— INTRO ——— */
function IntroSection() {
  const content = useContent();
  const { intro } = content.home;

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <AnimatedSection direction="left">
          <h2 className="text-charcoal mb-6 font-serif text-4xl md:text-5xl">
            {intro.heading}
          </h2>
          <p className="text-charcoal/70 mb-8 text-lg leading-relaxed">
            {intro.text}
          </p>
          <Link
            href={intro.cta_link}
            className="text-gold-dark inline-flex items-center gap-2 font-semibold transition-all hover:gap-4"
          >
            {intro.cta_text}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
        <AnimatedSection direction="right">
          <Card3D depth={10} className="overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative aspect-[4/5]">
              <img
                src={intro.image}
                alt={intro.heading}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="from-gold/20 absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>
          </Card3D>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ——— FEATURED SERVICES ——— */
function FeaturedServices() {
  const content = useContent();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, rotateY: 90 },
    show: { opacity: 1, rotateY: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-cream-dark py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection direction="up" className="mb-16 text-center">
          <h2 className="text-charcoal mb-4 font-serif text-4xl md:text-5xl">
            Our Signature Services
          </h2>
          <p className="text-charcoal/60 mx-auto max-w-2xl">
            Discover the artistry behind every service we offer.
          </p>
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{ perspective: 1000 }}
        >
          {content.home.featured_services.map((service, i) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <motion.div key={i} variants={item}>
                <Card3D
                  depth={12}
                  className="group h-full overflow-hidden rounded-2xl bg-white shadow-lg"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="from-charcoal/60 absolute inset-0 bg-gradient-to-t to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Icon className="text-gold h-8 w-8" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-charcoal mb-2 font-serif text-xl">
                      {service.title}
                    </h3>
                    <p className="text-charcoal/60 text-sm">
                      {service.description}
                    </p>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </motion.div>

        <AnimatedSection
          direction="up"
          delay={0.4}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="border-gold text-gold-dark hover:bg-gold hover:text-charcoal inline-flex items-center gap-2 rounded-full border-2 px-8 py-3 font-semibold transition-all"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ——— WHY CHOOSE US ——— */
function WhyChooseUs() {
  const content = useContent();
  const { why_us } = content.home;

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection direction="up" className="mb-16 text-center">
          <h2 className="text-charcoal mb-4 font-serif text-4xl md:text-5xl">
            {why_us.heading}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {why_us.features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Star;
            const dir = i % 2 === 0 ? "left" : "right";
            return (
              <AnimatedSection key={i} direction={dir} delay={i * 0.1}>
                <div className="flex gap-4 rounded-xl p-6 transition-all hover:bg-white hover:shadow-lg">
                  <div className="bg-gold/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <Icon className="text-gold h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-charcoal mb-1 font-serif text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-charcoal/60 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ——— TESTIMONIALS ——— */
function Testimonials() {
  const content = useContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = content.home.testimonials;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="bg-charcoal overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection direction="up" className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-4xl text-white md:text-5xl">
            What Our Clients Say
          </h2>
        </AnimatedSection>

        <div className="relative flex min-h-[300px] items-center justify-center">
          {testimonials.map((t, i) => {
            const offset = i - activeIndex;
            return (
              <motion.div
                key={i}
                className="bg-charcoal-light absolute mx-auto w-full max-w-lg rounded-2xl p-8 shadow-xl"
                animate={{
                  x: offset * 120,
                  scale: offset === 0 ? 1 : 0.85,
                  opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : 0.5,
                  rotateY: offset * -5,
                  zIndex: offset === 0 ? 10 : 5,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Quote className="text-gold/30 mb-4 h-8 w-8" />
                <p className="mb-6 text-lg leading-relaxed text-white/80">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="border-gold/40 h-10 w-10 rounded-full border-2 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-gold text-sm">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="mt-12 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i === activeIndex ? "bg-gold w-8" : "bg-white/20"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——— CTA BANNER ——— */
function CTABanner() {
  const content = useContent();
  const { cta_banner } = content.home;
  const shouldReduce = useReducedMotion();

  return (
    <section className="from-charcoal via-charcoal-light to-charcoal relative overflow-hidden bg-gradient-to-r py-24">
      {/* Floating orbs */}
      {!shouldReduce && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-gold/20 absolute h-3 w-3 rounded-full"
              style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </>
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <AnimatedSection direction="up">
          <h2 className="mb-6 font-serif text-4xl text-white md:text-6xl">
            {cta_banner.headline}
          </h2>
          <p className="mb-10 text-lg text-white/60">
            {cta_banner.subheadline}
          </p>
          <Link
            href={cta_banner.cta_link}
            className="bg-gold text-charcoal hover:bg-gold-light inline-flex items-center gap-2 rounded-full px-10 py-4 text-lg font-bold transition-all hover:scale-105"
          >
            {cta_banner.cta_text}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ——— HOME PAGE ——— */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <IntroSection />
      <FeaturedServices />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </>
  );
}
