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
      <div className="bg-cream flex min-h-screen items-center justify-center pt-20">
        <AnimatedSection
          direction="scale"
          className="mx-auto max-w-md px-6 text-center"
        >
          <motion.div
            className="bg-gold/15 mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <PartyPopper className="text-gold h-12 w-12" />
          </motion.div>
          <h1 className="text-charcoal mb-4 font-serif text-4xl">
            {booking.confirmation.heading}
          </h1>
          <p className="text-charcoal/60 mb-8">
            {booking.confirmation.message}
          </p>
          <Link
            href={booking.confirmation.cta_link}
            className="bg-gold text-charcoal hover:bg-gold-light inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all"
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
      <section className="bg-charcoal relative flex h-[40vh] items-center justify-center overflow-hidden">
        <div className="from-charcoal/80 to-charcoal absolute inset-0 bg-gradient-to-b" />
        <div className="relative z-10 px-6 text-center">
          <motion.h1
            className="mb-4 font-serif text-5xl text-white md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {booking.page_heading}
          </motion.h1>
          <motion.p
            className="mx-auto max-w-xl text-lg text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {booking.page_subheading}
          </motion.p>
        </div>
      </section>

      {/* Step Indicator */}
      <section className="bg-cream border-charcoal/10 border-b py-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6">
          {booking.steps.map((s, i) => (
            <div key={s.number} className="flex items-center gap-3">
              <motion.div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  step > s.number
                    ? "bg-gold text-charcoal"
                    : step === s.number
                      ? "bg-gold/20 text-gold border-gold border-2"
                      : "bg-charcoal/10 text-charcoal/40"
                }`}
                animate={step === s.number ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {step > s.number ? <Check className="h-5 w-5" /> : s.number}
              </motion.div>
              <span
                className={`hidden text-sm md:block ${step >= s.number ? "text-charcoal" : "text-charcoal/40"}`}
              >
                {s.title}
              </span>
              {i < booking.steps.length - 1 && (
                <div
                  className={`h-[2px] w-8 md:w-16 ${step > s.number ? "bg-gold" : "bg-charcoal/10"}`}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Form Steps */}
      <section className="bg-cream min-h-[60vh] py-16">
        <div className="mx-auto max-w-4xl px-6">
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
                <h2 className="text-charcoal mb-8 font-serif text-2xl">
                  Select a Service
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {booking.services_list.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`rounded-xl border-2 p-5 text-left transition-all ${
                        selectedService === service.id
                          ? "border-gold bg-gold/5 shadow-md"
                          : "border-charcoal/10 hover:border-gold/30"
                      }`}
                    >
                      <h3 className="text-charcoal font-semibold">
                        {service.name}
                      </h3>
                      <div className="text-charcoal/60 mt-2 flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {service.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          ₹{service.price.toLocaleString("en-IN")}
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
                <h2 className="text-charcoal mb-8 font-serif text-2xl">
                  Choose a Stylist
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {booking.stylists.map((stylist) => (
                    <button
                      key={stylist.id}
                      onClick={() => setSelectedStylist(stylist.id)}
                      className={`rounded-xl border-2 p-6 text-left transition-all ${
                        selectedStylist === stylist.id
                          ? "border-gold bg-gold/5 shadow-md"
                          : "border-charcoal/10 hover:border-gold/30"
                      }`}
                    >
                      <div className="bg-charcoal-light mb-4 h-16 w-16 rounded-full" />
                      <h3 className="text-charcoal font-semibold">
                        {stylist.name}
                      </h3>
                      <p className="text-charcoal/60 text-sm">{stylist.role}</p>
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
                <h2 className="text-charcoal mb-8 font-serif text-2xl">
                  Pick a Date & Time
                </h2>
                <div className="mb-8">
                  <h3 className="text-charcoal/60 mb-3 text-sm font-medium">
                    Date
                  </h3>
                  <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
                    {dates.map((d) => {
                      const key = d.toISOString().split("T")[0];
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedDate(key)}
                          className={`w-20 flex-shrink-0 rounded-xl border-2 py-3 text-center transition-all ${
                            selectedDate === key
                              ? "border-gold bg-gold/5"
                              : "border-charcoal/10 hover:border-gold/30"
                          }`}
                        >
                          <div className="text-charcoal/60 text-xs">
                            {d.toLocaleDateString("en", { weekday: "short" })}
                          </div>
                          <div className="text-charcoal text-lg font-semibold">
                            {d.getDate()}
                          </div>
                          <div className="text-charcoal/60 text-xs">
                            {d.toLocaleDateString("en", { month: "short" })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3 className="text-charcoal/60 mb-3 text-sm font-medium">
                    Time
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {booking.time_slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`rounded-full border-2 px-4 py-2 text-sm transition-all ${
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
                <h2 className="text-charcoal mb-8 font-serif text-2xl">
                  Your Details
                </h2>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-lg space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-charcoal/70 mb-1 block text-sm font-medium">
                        First Name
                      </label>
                      <input
                        {...register("firstName")}
                        className="border-charcoal/15 focus:border-gold w-full rounded-xl border bg-white px-4 py-3 transition-colors focus:outline-none"
                      />
                      {errors.firstName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-500"
                        >
                          {errors.firstName.message}
                        </motion.p>
                      )}
                    </div>
                    <div>
                      <label className="text-charcoal/70 mb-1 block text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        {...register("lastName")}
                        className="border-charcoal/15 focus:border-gold w-full rounded-xl border bg-white px-4 py-3 transition-colors focus:outline-none"
                      />
                      {errors.lastName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-500"
                        >
                          {errors.lastName.message}
                        </motion.p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-charcoal/70 mb-1 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="border-charcoal/15 focus:border-gold w-full rounded-xl border bg-white px-4 py-3 transition-colors focus:outline-none"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs text-red-500"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label className="text-charcoal/70 mb-1 block text-sm font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="border-charcoal/15 focus:border-gold w-full rounded-xl border bg-white px-4 py-3 transition-colors focus:outline-none"
                    />
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs text-red-500"
                      >
                        {errors.phone.message}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label className="text-charcoal/70 mb-1 block text-sm font-medium">
                      Notes (optional)
                    </label>
                    <textarea
                      {...register("notes")}
                      rows={3}
                      className="border-charcoal/15 focus:border-gold w-full resize-none rounded-xl border bg-white px-4 py-3 transition-colors focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gold text-charcoal hover:bg-gold-light w-full rounded-full py-3 font-semibold transition-all"
                  >
                    Confirm Booking
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step < 4 && (
            <div className="mt-12 flex justify-between">
              <button
                onClick={goBack}
                disabled={step === 1}
                className="text-charcoal/60 hover:text-charcoal flex items-center gap-2 transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={goNext}
                disabled={!canNext()}
                className="bg-gold text-charcoal hover:bg-gold-light flex items-center gap-2 rounded-full px-6 py-2 font-semibold transition-all disabled:opacity-30"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
