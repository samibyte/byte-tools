"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Search, CheckCircle, Bookmark, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepCard from "./ui/StepCard";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Browse our curated marketplace of developer tools tailored to your needs.",
    gradient: "from-primary to-blue-500",
  },
  {
    icon: CheckCircle,
    title: "Evaluate",
    description:
      "Compare features, ratings, and reviews to find the perfect fit for your project.",
    gradient: "from-primary to-purple-500",
  },
  {
    icon: Bookmark,
    title: "Save",
    description:
      "Add your favorite tools to collections and track the ones that matter most.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Zap,
    title: "Use",
    description:
      "Purchase instantly and integrate powerful tools into your workflow right away.",
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-accent/5" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your development workflow in four simple steps
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="hidden lg:block absolute top-20 left-20 right-20 h-0.5 bg-gradient-to-r from-border via-primary/30 to-border"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <StepCard
                key={step.title}
                step={step}
                steps={steps}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button size="lg" className="gap-2 px-8 rounded-full">
            Start Exploring Tools
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
