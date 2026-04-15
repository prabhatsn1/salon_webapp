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
      <section className="relative h-[50vh] flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-charcoal" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="font-serif text-5xl md:text-7xl text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our Gallery
          </motion.h1>
          <motion.p
            className="text-white/60 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            A showcase of our artistry and craft.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-0 z-30 bg-cream border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar">
          {gallery.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-5 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors ${
                activeFilter === cat
                  ? "text-charcoal"
                  : "text-charcoal/50 hover:text-charcoal/80"
              }`}
            >
              {cat}
              {activeFilter === cat && (
                <motion.div
                  layoutId="gallery-tab"
                  className="absolute inset-0 bg-gold/15 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
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
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => setLightboxImage(img.src)}
                >
                  <motion.div
                    className="relative overflow-hidden rounded-2xl bg-charcoal-light shadow-lg"
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
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium">
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
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
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
              <X className="w-8 h-8" />
            </button>
            <motion.div
              className="max-w-4xl w-full aspect-[4/3] rounded-2xl overflow-hidden relative"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Gallery preview"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
