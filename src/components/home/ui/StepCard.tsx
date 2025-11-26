"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Step = {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
};

export default function StepCard({
  step,
  index,
  steps,
  isInView,
}: {
  steps: Step[];
  step: Step;
  index: number;
  isInView: boolean;
}) {
  const Icon = step.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-30px" });
  const radius = 270;
  const [visible, setVisible] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={
        isInView && cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
      }
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input relative group rounded-lg p-0.5 transition duration-300"
    >
      <Card className="h-full border-2 hover:border-primary/20 transition-colors duration-300 group-hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={
                cardInView
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.8, opacity: 0 }
              }
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.1,
              }}
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} p-0.5 mb-6`}
            >
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </motion.div>

            {/* Step Number */}
            <div className="flex items-center justify-between mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={cardInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.6 + index * 0.1,
                  type: "tween",
                  stiffness: 200,
                }}
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold"
              >
                {index + 1}
              </motion.div>

              {/* Arrow for connection - Mobile */}
              {index < steps.length - 1 && (
                <div className="lg:hidden text-muted-foreground">
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        </CardContent>
      </Card>

      {/* Arrow for connection - Desktop */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={cardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
          className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          <ArrowRight className="h-5 w-5" />
        </motion.div>
      )}
    </motion.div>
  );
}
