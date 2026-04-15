"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  PartyPopper,
} from "lucide-react";
import { useContent } from "@/lib/useContent";
import AnimatedSection from "@/components/ui/AnimatedSection";

const detailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  notes: z.string().optional(),
});

type DetailsForm = z.infer<typeof detailsSchema>;

export default function BookingPage() {
  const content = useContent();
  const { booking } = content;

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsForm>({
    resolver: zodResolver(detailsSchema),
  });

  const canNext = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedStylist;
    if (step === 3) return !!selectedDate && !!selectedTime;
    return false;
  };

  const onSubmit = () => {
    setConfirmed(true);
  };

  // Generate next 14 days for date picker
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
        <AnimatedSection
          direction="scale"
          className="text-center max-w-md mx-auto px-6"
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gold/15 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <PartyPopper className="w-12 h-12 text-gold" />
          </motion.div>
          <h1 className="font-serif text-4xl text-charcoal mb-4">
            {booking.confirmation.heading}
          </h1>
          <p className="text-charcoal/60 mb-8">
            {booking.confirmation.message}
          </p>
          <Link
            href={booking.confirmation.cta_link}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-light transition-all"
          >
            {booking.confirmation.cta_text}
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-charcoal" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="font-serif text-5xl md:text-7xl text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {booking.page_heading}
          </motion.h1>
          <motion.p
            className="text-white/60 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {booking.page_subheading}
          </motion.p>
        </div>
      </section>

      {/* Step Indicator */}
      <section className="bg-cream py-8 border-b border-charcoal/10">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
          {booking.steps.map((s, i) => (
            <div key={s.number} className="flex items-center gap-3">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  step > s.number
                    ? "bg-gold text-charcoal"
                    : step === s.number
                      ? "bg-gold/20 text-gold border-2 border-gold"
                      : "bg-charcoal/10 text-charcoal/40"
                }`}
                animate={step === s.number ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {step > s.number ? <Check className="w-5 h-5" /> : s.number}
              </motion.div>
              <span
                className={`text-sm hidden md:block ${step >= s.number ? "text-charcoal" : "text-charcoal/40"}`}
              >
                {s.title}
              </span>
              {i < booking.steps.length - 1 && (
                <div
                  className={`w-8 md:w-16 h-[2px] ${step > s.number ? "bg-gold" : "bg-charcoal/10"}`}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Form Steps */}
      <section className="py-16 bg-cream min-h-[60vh]">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-serif text-2xl text-charcoal mb-8">
                  Select a Service
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {booking.services_list.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`text-left p-5 rounded-xl border-2 transition-all ${
                        selectedService === service.id
                          ? "border-gold bg-gold/5 shadow-md"
                          : "border-charcoal/10 hover:border-gold/30"
                      }`}
                    >
                      <h3 className="font-semibold text-charcoal">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-charcoal/60">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {service.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          ₹{service.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-serif text-2xl text-charcoal mb-8">
                  Choose a Stylist
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {booking.stylists.map((stylist) => (
                    <button
                      key={stylist.id}
                      onClick={() => setSelectedStylist(stylist.id)}
                      className={`text-left p-6 rounded-xl border-2 transition-all ${
                        selectedStylist === stylist.id
                          ? "border-gold bg-gold/5 shadow-md"
                          : "border-charcoal/10 hover:border-gold/30"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full bg-charcoal-light mb-4" />
                      <h3 className="font-semibold text-charcoal">
                        {stylist.name}
                      </h3>
                      <p className="text-sm text-charcoal/60">{stylist.role}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-serif text-2xl text-charcoal mb-8">
                  Pick a Date & Time
                </h2>
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-charcoal/60 mb-3">
                    Date
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {dates.map((d) => {
                      const key = d.toISOString().split("T")[0];
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedDate(key)}
                          className={`flex-shrink-0 w-20 py-3 rounded-xl border-2 text-center transition-all ${
                            selectedDate === key
                              ? "border-gold bg-gold/5"
                              : "border-charcoal/10 hover:border-gold/30"
                          }`}
                        >
                          <div className="text-xs text-charcoal/60">
                            {d.toLocaleDateString("en", { weekday: "short" })}
                          </div>
                          <div className="text-lg font-semibold text-charcoal">
                            {d.getDate()}
                          </div>
                          <div className="text-xs text-charcoal/60">
                            {d.toLocaleDateString("en", { month: "short" })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-charcoal/60 mb-3">
                    Time
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {booking.time_slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${
                          selectedTime === slot
                            ? "border-gold bg-gold/5 text-charcoal font-semibold"
                            : "border-charcoal/10 text-charcoal/60 hover:border-gold/30"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-serif text-2xl text-charcoal mb-8">
                  Your Details
                </h2>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-lg space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-1">
                        First Name
                      </label>
                      <input
                        {...register("firstName")}
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-white focus:outline-none focus:border-gold transition-colors"
                      />
                      {errors.firstName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.firstName.message}
                        </motion.p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-1">
                        Last Name
                      </label>
                      <input
                        {...register("lastName")}
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-white focus:outline-none focus:border-gold transition-colors"
                      />
                      {errors.lastName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.lastName.message}
                        </motion.p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-white focus:outline-none focus:border-gold transition-colors"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-white focus:outline-none focus:border-gold transition-colors"
                    />
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.phone.message}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-1">
                      Notes (optional)
                    </label>
                    <textarea
                      {...register("notes")}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-white focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-light transition-all"
                  >
                    Confirm Booking
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between mt-12">
              <button
                onClick={goBack}
                disabled={step === 1}
                className="flex items-center gap-2 text-charcoal/60 hover:text-charcoal disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={goNext}
                disabled={!canNext()}
                className="flex items-center gap-2 px-6 py-2 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-light disabled:opacity-30 transition-all"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
