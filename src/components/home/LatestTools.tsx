"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import ToolCard from "@/components/ToolCard";
import Link from "next/link";
import { IconMoodEmpty } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface Tool {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  tags: string[];
  features?: string[];
}

export default function LatestTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Scroll-based opacity for seamless transition from hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const topOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const topScale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  // Fetch tools from API
  useEffect(() => {
    async function fetchTools() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/tools/latest");

        if (!res.ok) {
          throw new Error("Failed to fetch tools");
        }

        const data = await res.json();
        setTools(data);
      } catch (err) {
        console.error("Failed to fetch tools:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTools();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        style={{ opacity: topOpacity, scale: topScale }}
        className="absolute inset-0 bg-gradient-to-b from-background/0 via-background to-background pointer-events-none"
      />

      {/* Background Elements */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_30%,transparent_100%)]" />
      </div> */}

      <div ref={sectionRef} className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary hover:bg-primary/15"
          >
            Latest Tools
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Discover{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Powerful Tools
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of developer tools to enhance your
            workflow and boost productivity.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-[400px] rounded-2xl bg-muted/50 animate-pulse"
              />
            ))}
          </motion.div>
        )}

        {/* Tools Grid */}
        {!isLoading && tools.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool._id}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                }}
              >
                <ToolCard
                  _id={tool._id}
                  title={tool.title}
                  description={tool.description}
                  price={tool.price}
                  category={tool.category}
                  image={tool.image}
                  rating={tool.rating}
                  tags={tool.tags}
                  features={tool.features}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && tools.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6"
            >
              <IconMoodEmpty className="h-10 w-10 text-muted-foreground" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3">
              No tools available yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Be the first one to create and share amazing developer tools with
              the community.
            </p>
            <Link href="/add-tools">
              <Button className="gap-2">
                Add Your First Tool
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        )}

        {/* View All CTA */}
        {!isLoading && tools.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Link href="/discover-tools">
              <Button variant="outline" size="lg" className="gap-2">
                View All Tools
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
