"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  Globe,
  ExternalLink,
} from "lucide-react";
import { useContent } from "@/lib/useContent";
import AnimatedSection from "@/components/ui/AnimatedSection";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const content = useContent();
  const { contact, brand } = content;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const today = new Date().toLocaleDateString("en", { weekday: "long" });

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
            {contact.page_heading}
          </motion.h1>
          <motion.p
            className="text-white/60 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {contact.page_subheading}
          </motion.p>
        </div>
      </section>

      {/* Split Layout */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <AnimatedSection direction="left">
            <h2 className="font-serif text-3xl text-charcoal mb-8">
              Contact Information
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-charcoal">Address</p>
                  <p className="text-charcoal/60 text-sm">
                    {brand.address.street}
                  </p>
                  <p className="text-charcoal/60 text-sm">
                    {brand.address.city}, {brand.address.state}{" "}
                    {brand.address.zip}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-charcoal">Phone</p>
                  <a
                    href={`tel:${brand.phone}`}
                    className="text-charcoal/60 text-sm hover:text-gold transition-colors"
                  >
                    {brand.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-charcoal">Email</p>
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-charcoal/60 text-sm hover:text-gold transition-colors"
                  >
                    {brand.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <h3 className="font-serif text-xl text-charcoal mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" />
              Business Hours
            </h3>
            <div className="space-y-2 mb-10">
              {brand.hours.map((h, i) => (
                <AnimatedSection key={h.day} direction="up" delay={i * 0.05}>
                  <div
                    className={`flex justify-between py-2 px-4 rounded-lg text-sm ${
                      h.day === today
                        ? "bg-gold/10 text-charcoal font-medium"
                        : "text-charcoal/70"
                    }`}
                  >
                    <span>{h.day}</span>
                    <span>
                      {h.open} – {h.close}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-4">
              {brand.social.instagram && (
                <motion.a
                  href={brand.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-charcoal flex items-center justify-center text-white hover:bg-gold hover:text-charcoal transition-all"
                  whileHover={{ scale: 1.1 }}
                  aria-label="Instagram"
                >
                  <Globe className="w-5 h-5" />
                </motion.a>
              )}
              {brand.social.facebook && (
                <motion.a
                  href={brand.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-charcoal flex items-center justify-center text-white hover:bg-gold hover:text-charcoal transition-all"
                  whileHover={{ scale: 1.1 }}
                  aria-label="Facebook"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </AnimatedSection>

          {/* Right - Contact Form */}
          <AnimatedSection direction="right">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="font-serif text-3xl text-charcoal mb-8">
                Send Us a Message
              </h2>

              {submitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/15 flex items-center justify-center">
                    <Check className="w-8 h-8 text-gold" />
                  </div>
                  <p className="text-charcoal font-medium text-lg">
                    {contact.form_success_message}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {contact.form_fields.map((field, i) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <label className="block text-sm font-medium text-charcoal/70 mb-1">
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          {...register(field.name as keyof ContactForm)}
                          placeholder={field.placeholder}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-cream/50 focus:outline-none focus:border-gold transition-colors resize-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          {...register(field.name as keyof ContactForm)}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-cream/50 focus:outline-none focus:border-gold transition-colors"
                        />
                      )}
                      {errors[field.name as keyof ContactForm] && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors[field.name as keyof ContactForm]?.message}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-light transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] bg-charcoal-light relative">
        <div className="absolute inset-0 flex items-center justify-center text-white/20 font-serif text-2xl">
          <div className="text-center">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
            </motion.div>
            <p>{brand.address.street}</p>
            <p className="text-sm text-white/10">
              {brand.address.city}, {brand.address.state}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
