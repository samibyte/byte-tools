"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import TestimonialCard from "./ui/TestimonailCard";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Full Stack Developer",
    company: "TechCorp",
    avatar: "/avatars/sarah-chen.jpg",
    rating: 5,
    text: "Byte Tools has revolutionized our development workflow. The tools are intuitive and have cut our deployment time by 40%. Absolutely essential for modern development teams.",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    company: "StartupXYZ",
    avatar: "/avatars/marcus-rodriguez.jpg",
    rating: 5,
    text: "The quality and variety of tools available here is unmatched. Our team's productivity has skyrocketed since we started using Byte Tools regularly.",
  },
  {
    name: "Emily Watson",
    role: "Lead DevOps Engineer",
    company: "CloudNative Inc",
    avatar: "/avatars/emily-watson.jpg",
    rating: 5,
    text: "Finally, a platform that understands what developers actually need. The tools are well-documented, reliable, and constantly updated. Worth every penny.",
  },
];

export default function UserTestimonial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-background w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Developers
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what developers worldwide are saying about Byte Tools
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <span>10,000+ Developers</span>
            <span>•</span>
            <span>98% Satisfaction Rate</span>
            <span>•</span>
            <span>50+ Countries</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
