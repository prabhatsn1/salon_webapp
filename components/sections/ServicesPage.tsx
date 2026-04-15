"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { useContent } from "@/lib/useContent";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card3D from "@/components/ui/Card3D";

export default function ServicesPage() {
  const content = useContent();
  const { services } = content;
  const [activeCategory, setActiveCategory] = useState(
    services.categories[0].id,
  );
  const activeServices =
    services.categories.find((c) => c.id === activeCategory)?.services ?? [];

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
            {services.page_heading}
          </motion.h1>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {services.page_subheading}
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-cream border-charcoal/10 sticky top-0 z-30 border-b">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4">
          {services.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? "text-charcoal"
                  : "text-charcoal/50 hover:text-charcoal/80"
              }`}
            >
              {cat.title}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="service-tab"
                  className="bg-gold/15 absolute inset-0 -z-10 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Service Cards */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeServices.map((service, i) => (
                <AnimatedSection
                  key={service.name}
                  direction="up"
                  delay={i * 0.08}
                >
                  <Card3D
                    depth={8}
                    className="h-full rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl"
                  >
                    <h3 className="text-charcoal mb-2 font-serif text-xl">
                      {service.name}
                    </h3>
                    <p className="text-charcoal/60 mb-4 text-sm">
                      {service.description}
                    </p>
                    <div className="text-charcoal/70 flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="text-gold h-4 w-4" />
                        {service.duration}
                      </span>
                      <span className="text-gold flex items-center gap-1 font-medium">
                        ₹{service.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </Card3D>
                </AnimatedSection>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="bg-charcoal py-16">
        <AnimatedSection
          direction="up"
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <h2 className="mb-4 font-serif text-3xl text-white md:text-4xl">
            {services.consultation_cta.heading}
          </h2>
          <p className="mb-8 text-white/60">{services.consultation_cta.text}</p>
          <Link
            href={services.consultation_cta.cta_link}
            className="bg-gold text-charcoal hover:bg-gold-light inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all"
          >
            {services.consultation_cta.cta_text}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
