import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Testimonial = {
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  text: string;
  rating: number;
};

export default function TestimonialCard({
  testimonial,
  index,
  isInView,
}: {
  testimonial: Testimonial;
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
            initial={{ scale: 0 }}
            animate={cardInView ? { scale: 1 } : { scale: 0 }}
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
            className="text-foreground mb-6 h-36 leading-relaxed"
          >
            {`"${testimonial.text}"`}
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
