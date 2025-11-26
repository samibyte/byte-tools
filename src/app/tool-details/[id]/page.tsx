"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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
  updatedAt: string;
}

export default function ToolDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [tool, setTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTool() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/tools/${params.id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch tool");
        }

        const data = await res.json();
        setTool(data);
      } catch (err) {
        console.error("Failed to fetch tool:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (params.id) {
      fetchTool();
    }
  }, [params.id]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Tool not found</h2>
          <p className="text-muted-foreground mb-4">
            The tool you&aposre looking for doesn&apost exist.
          </p>
          <Button onClick={() => router.push("/discover")}>
            Back to Discover
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(tool.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Hero Image Banner */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-muted">
        <Image
          src={tool.image}
          alt={tool.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-card rounded-lg border shadow-lg p-6 sm:p-8 space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            {/* Category Badge */}
            <div>
              <Badge variant="secondary" className="text-sm">
                {tool.category}
              </Badge>
            </div>

            {/* Title & Rating */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {tool.title}
              </h1>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950 px-3 py-1.5 rounded-lg">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-lg">
                    {tool.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">
                ${tool.price.toFixed(2)}
              </span>
              <span className="text-muted-foreground">one-time payment</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t" />

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">About this tool</h2>
            <p className="text-muted-foreground leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* Features Section */}
          {tool.features && tool.features.length > 0 && (
            <>
              <div className="border-t" />
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Key Features</h2>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Tags Section */}
          {tool.tags && tool.tags.length > 0 && (
            <>
              <div className="border-t" />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">Tags</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Metadata */}
          <div className="border-t" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {formattedDate}</span>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button size="lg" className="w-full sm:w-auto text-base">
              Purchase Tool
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20" />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      <Skeleton className="w-full h-[300px] sm:h-[400px] lg:h-[500px]" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-card rounded-lg border shadow-lg p-6 sm:p-8 space-y-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
