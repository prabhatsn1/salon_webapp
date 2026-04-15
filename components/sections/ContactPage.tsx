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
      <section className="bg-charcoal relative flex h-[50vh] items-center justify-center overflow-hidden">
        <div className="from-charcoal/80 to-charcoal absolute inset-0 bg-gradient-to-b" />
        <div className="relative z-10 px-6 text-center">
          <motion.h1
            className="mb-4 font-serif text-5xl text-white md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {contact.page_heading}
          </motion.h1>
          <motion.p
            className="mx-auto max-w-xl text-lg text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {contact.page_subheading}
          </motion.p>
        </div>
      </section>

      {/* Split Layout */}
      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2">
          {/* Left - Contact Info */}
          <AnimatedSection direction="left">
            <h2 className="text-charcoal mb-8 font-serif text-3xl">
              Contact Information
            </h2>

            <div className="mb-10 space-y-6">
              <div className="flex gap-4">
                <div className="bg-gold/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <MapPin className="text-gold h-5 w-5" />
                </div>
                <div>
                  <p className="text-charcoal font-medium">Address</p>
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
                <div className="bg-gold/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <Phone className="text-gold h-5 w-5" />
                </div>
                <div>
                  <p className="text-charcoal font-medium">Phone</p>
                  <a
                    href={`tel:${brand.phone}`}
                    className="text-charcoal/60 hover:text-gold text-sm transition-colors"
                  >
                    {brand.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-gold/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <Mail className="text-gold h-5 w-5" />
                </div>
                <div>
                  <p className="text-charcoal font-medium">Email</p>
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-charcoal/60 hover:text-gold text-sm transition-colors"
                  >
                    {brand.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <h3 className="text-charcoal mb-4 flex items-center gap-2 font-serif text-xl">
              <Clock className="text-gold h-5 w-5" />
              Business Hours
            </h3>
            <div className="mb-10 space-y-2">
              {brand.hours.map((h, i) => (
                <AnimatedSection key={h.day} direction="up" delay={i * 0.05}>
                  <div
                    className={`flex justify-between rounded-lg px-4 py-2 text-sm ${
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
                  className="bg-charcoal hover:bg-gold hover:text-charcoal flex h-12 w-12 items-center justify-center rounded-full text-white transition-all"
                  whileHover={{ scale: 1.1 }}
                  aria-label="Instagram"
                >
                  <Globe className="h-5 w-5" />
                </motion.a>
              )}
              {brand.social.facebook && (
                <motion.a
                  href={brand.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-charcoal hover:bg-gold hover:text-charcoal flex h-12 w-12 items-center justify-center rounded-full text-white transition-all"
                  whileHover={{ scale: 1.1 }}
                  aria-label="Facebook"
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.a>
              )}
            </div>
          </AnimatedSection>

          {/* Right - Contact Form */}
          <AnimatedSection direction="right">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="text-charcoal mb-8 font-serif text-3xl">
                Send Us a Message
              </h2>

              {submitted ? (
                <motion.div
                  className="py-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="bg-gold/15 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                    <Check className="text-gold h-8 w-8" />
                  </div>
                  <p className="text-charcoal text-lg font-medium">
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
                      <label className="text-charcoal/70 mb-1 block text-sm font-medium">
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          {...register(field.name as keyof ContactForm)}
                          placeholder={field.placeholder}
                          rows={4}
                          className="border-charcoal/15 bg-cream/50 focus:border-gold w-full resize-none rounded-xl border px-4 py-3 transition-colors focus:outline-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          {...register(field.name as keyof ContactForm)}
                          placeholder={field.placeholder}
                          className="border-charcoal/15 bg-cream/50 focus:border-gold w-full rounded-xl border px-4 py-3 transition-colors focus:outline-none"
                        />
                      )}
                      {errors[field.name as keyof ContactForm] && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-500"
                        >
                          {errors[field.name as keyof ContactForm]?.message}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="bg-gold text-charcoal hover:bg-gold-light flex w-full items-center justify-center gap-2 rounded-full py-3 font-semibold transition-all disabled:opacity-70"
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <motion.div
                        className="border-charcoal/30 border-t-charcoal h-5 w-5 rounded-full border-2"
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
                        <Send className="h-4 w-4" />
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
      <section className="bg-charcoal-light relative h-[400px]">
        <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-white/20">
          <div className="text-center">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <MapPin className="text-gold mx-auto mb-4 h-12 w-12" />
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
