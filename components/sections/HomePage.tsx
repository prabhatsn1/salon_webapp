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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal z-10" />
      <div className="absolute inset-0 bg-[url('/images/hero-salon.jpg')] bg-cover bg-center opacity-60" />

      {/* 3D floating element */}
      {!shouldReduce && (
        <motion.div
          className="absolute right-[15%] top-1/3 w-32 h-32 border-2 border-gold/30 rounded-full z-10"
          animate={{ rotateY: 360, rotateX: 15 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        />
      )}

      <div className="relative z-20 text-center max-w-4xl px-6">
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto"
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-semibold text-lg rounded-full hover:bg-gold-light transition-all hover:scale-105"
          >
            {hero.cta_text}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* scroll indicator */}
      {!shouldReduce && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold rounded-full" />
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
      className="font-serif text-4xl md:text-5xl font-bold text-gold"
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
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {content.home.stats.map((stat, i) => (
          <AnimatedSection key={i} direction="up" delay={i * 0.1}>
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="text-white/60 mt-2 text-sm">{stat.label}</p>
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
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <AnimatedSection direction="left">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
            {intro.heading}
          </h2>
          <p className="text-charcoal/70 leading-relaxed text-lg mb-8">
            {intro.text}
          </p>
          <Link
            href={intro.cta_link}
            className="inline-flex items-center gap-2 text-gold-dark font-semibold hover:gap-4 transition-all"
          >
            {intro.cta_text}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
        <AnimatedSection direction="right">
          <Card3D depth={10} className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-[4/5] relative">
              <img
                src={intro.image}
                alt={intro.heading}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent" />
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
    <section className="py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            Our Signature Services
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto">
            Discover the artistry behind every service we offer.
          </p>
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
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
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group h-full"
                >
                  <div className="aspect-[3/2] relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Icon className="w-8 h-8 text-gold" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-charcoal mb-2">
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
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gold text-gold-dark font-semibold rounded-full hover:bg-gold hover:text-charcoal transition-all"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
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
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
            {why_us.heading}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {why_us.features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Star;
            const dir = i % 2 === 0 ? "left" : "right";
            return (
              <AnimatedSection key={i} direction={dir} delay={i * 0.1}>
                <div className="flex gap-4 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-charcoal mb-1">
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
    <section className="py-24 bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            What Our Clients Say
          </h2>
        </AnimatedSection>

        <div className="relative flex items-center justify-center min-h-[300px]">
          {testimonials.map((t, i) => {
            const offset = i - activeIndex;
            return (
              <motion.div
                key={i}
                className="absolute w-full max-w-lg mx-auto bg-charcoal-light rounded-2xl p-8 shadow-xl"
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
                <Quote className="w-8 h-8 text-gold/30 mb-4" />
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gold/40"
                  />
                  <div>
                    <p className="text-white font-semibold">{t.name}</p>
                    <p className="text-gold text-sm">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
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
    <section className="relative py-24 bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal overflow-hidden">
      {/* Floating orbs */}
      {!shouldReduce && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gold/20 rounded-full"
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection direction="up">
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
            {cta_banner.headline}
          </h2>
          <p className="text-white/60 text-lg mb-10">
            {cta_banner.subheadline}
          </p>
          <Link
            href={cta_banner.cta_link}
            className="inline-flex items-center gap-2 px-10 py-4 bg-gold text-charcoal font-bold text-lg rounded-full hover:bg-gold-light transition-all hover:scale-105"
          >
            {cta_banner.cta_text}
            <ArrowRight className="w-5 h-5" />
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
