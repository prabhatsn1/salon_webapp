"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useContent } from "@/lib/useContent";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function GalleryPage() {
  const content = useContent();
  const { gallery } = content;
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filtered =
    activeFilter === "All"
      ? gallery.images
      : gallery.images.filter((img) => img.category === activeFilter);

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
            Our Gallery
          </motion.h1>
          <motion.p
            className="text-lg text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            A showcase of our artistry and craft.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-cream border-charcoal/10 sticky top-0 z-30 border-b">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4">
          {gallery.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === cat
                  ? "text-charcoal"
                  : "text-charcoal/50 hover:text-charcoal/80"
              }`}
            >
              {cat}
              {activeFilter === cat && (
                <motion.div
                  layoutId="gallery-tab"
                  className="bg-gold/15 absolute inset-0 -z-10 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3"
            layout
          >
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group cursor-pointer break-inside-avoid"
                  onClick={() => setLightboxImage(img.src)}
                >
                  <motion.div
                    className="bg-charcoal-light relative overflow-hidden rounded-2xl shadow-lg"
                    whileHover={{
                      rotateX: 2,
                      rotateY: -2,
                      translateZ: 10,
                      scale: 1.02,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={`w-full ${
                        i % 3 === 0
                          ? "aspect-[3/4]"
                          : i % 3 === 1
                            ? "aspect-square"
                            : "aspect-[4/3]"
                      } relative`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="from-charcoal/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="absolute right-4 bottom-4 left-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <p className="text-sm font-medium text-white">
                          {img.alt}
                        </p>
                        <p className="text-gold text-xs">{img.category}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              onClick={() => setLightboxImage(null)}
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Gallery preview"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
