import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ToolCardProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  tags: string[];
  features?: string[];
}

const ToolCard = React.memo<ToolCardProps>(
  ({
    _id,
    title,
    description,
    price,
    category,
    image,
    rating,
    tags,
    features,
  }) => {
    const radius = 270;
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
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
        className="group/input rounded-lg p-0.5 transition duration-300"
      >
        <Card className="group overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden aspect-video bg-muted">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={false}
            />
            <div className="absolute top-3 right-3">
              <Badge
                variant="secondary"
                className="bg-background/90 backdrop-blur-sm"
              >
                {category}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg leading-tight line-clamp-1">
                {title}
              </h3>
              <div className="flex items-center gap-1 text-sm shrink-0">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{rating.toFixed(1)}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-4 flex-1">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {description}
            </p>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.slice(0, 3).map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs px-2 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Features */}
            {features && features.length > 0 && (
              <div className="text-xs text-muted-foreground">
                {features.slice(0, 2).join(" • ")}
              </div>
            )}
          </CardContent>

          <CardFooter className="pt-0 mt-auto">
            <div className="flex items-center justify-between w-full">
              <div>
                <span className="text-2xl font-bold">${price.toFixed(2)}</span>
              </div>
              <Link
                href={`/tool-details/${_id}`}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View Details
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }
);

ToolCard.displayName = "ToolCard";

export default ToolCard;
