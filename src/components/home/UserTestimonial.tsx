"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary hover:bg-primary/15"
          >
            Testimonials
          </Badge>
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

function TestimonialCard({
  testimonial,
  index,
  isInView,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={
        isInView && cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
      }
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.1,
      }}
      className="h-full"
    >
      <Card className="h-full border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-lg group">
        <CardContent className="p-6 sm:p-8">
          {/* Quote Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={
              cardInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
            }
            transition={{
              duration: 0.5,
              delay: 0.4 + index * 0.1,
            }}
            className="mb-6"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Quote className="h-6 w-6 text-primary" />
            </div>
          </motion.div>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            className="flex gap-1 mb-4"
          >
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </motion.div>

          {/* Testimonial Text */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            className="text-foreground mb-6 leading-relaxed"
          >
            "{testimonial.text}"
          </motion.blockquote>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
            className="flex items-center gap-4"
          >
            <Avatar className="h-12 w-12 border-2 border-background">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground truncate">
                {testimonial.name}
              </h4>
              <p className="text-sm text-muted-foreground truncate">
                {testimonial.role}
              </p>
              <p className="text-xs text-muted-foreground/70 truncate">
                {testimonial.company}
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
