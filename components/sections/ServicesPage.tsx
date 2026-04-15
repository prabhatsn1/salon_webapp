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
      <section className="relative h-[50vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-charcoal" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="font-serif text-5xl md:text-7xl text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {services.page_heading}
          </motion.h1>
          <motion.p
            className="text-white/60 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {services.page_subheading}
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-0 z-30 bg-cream border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar">
          {services.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors ${
                activeCategory === cat.id
                  ? "text-charcoal"
                  : "text-charcoal/50 hover:text-charcoal/80"
              }`}
            >
              {cat.title}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="service-tab"
                  className="absolute inset-0 bg-gold/15 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow h-full"
                  >
                    <h3 className="font-serif text-xl text-charcoal mb-2">
                      {service.name}
                    </h3>
                    <p className="text-charcoal/60 text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-charcoal/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gold" />
                        {service.duration}
                      </span>
                      <span className="flex items-center gap-1 text-gold font-medium">
                        ₹{service.price.toLocaleString('en-IN')}
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
      <section className="py-16 bg-charcoal">
        <AnimatedSection
          direction="up"
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            {services.consultation_cta.heading}
          </h2>
          <p className="text-white/60 mb-8">{services.consultation_cta.text}</p>
          <Link
            href={services.consultation_cta.cta_link}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-light transition-all"
          >
            {services.consultation_cta.cta_text}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
