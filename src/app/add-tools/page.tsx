"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  "Developer Tools",
  "Design Tools",
  "Productivity",
  "Security",
  "Testing",
  "Analytics",
  "Other",
];

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ───────────────────────────────
  // React Hook Form
  // ───────────────────────────────
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "",
      image: "", // optional now
      rating: "0",
    },
  });

  // Watch category for Select
  const categoryValue = watch("category");

  // Tags + Features
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  // ───────────── TAGS ─────────────
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // ─────────── FEATURES ───────────
  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFeatures(features.filter((f) => f !== featureToRemove));
  };

  const onSubmit = async (values) => {
    if (tags.length === 0) {
      alert("At least one tag is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...values,
        price: parseFloat(values.price),
        rating: parseFloat(values.rating),
        tags,
        features: features.length > 0 ? features : undefined,
        updatedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create tool");

      const data = await res.json();
      router.push(`/tools/${data._id}`);
    } catch (err) {
      console.error("Failed to create tool:", err);
      alert("Failed to create tool. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-linear-to-b from-muted/50 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Add New Tool
            </h1>
            <p className="text-muted-foreground">
              Fill in the details to add a new tool to the marketplace.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-card rounded-lg border p-6 space-y-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                {...register("title", { required: "Title is required" })}
                placeholder="API Tester Mini"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={6}
                placeholder="Describe your tool in detail..."
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <Label>
                  Category <span className="text-destructive">*</span>
                </Label>

                <Select
                  value={categoryValue}
                  onValueChange={(v) => setValue("category", v)}
                >
                  <SelectTrigger
                    className={errors.category ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.category && (
                  <p className="text-sm text-destructive">
                    {errors.category.message}
                  </p>
                )}

                {/* hidden RHF register for validation */}
                <input
                  type="hidden"
                  {...register("category", {
                    required: "Category is required",
                  })}
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price (USD) <span className="text-destructive">*</span>
                </Label>
                <Input
                  {...register("price", {
                    required: "Price is required",
                    validate: (v) =>
                      parseFloat(v) > 0 || "Price must be greater than zero",
                  })}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="9.99"
                  className={errors.price ? "border-destructive" : ""}
                />
                {errors.price && (
                  <p className="text-sm text-destructive">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image & Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Image (optional now) */}
              <div className="space-y-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  {...register("image", {
                    validate: (v) =>
                      !v ||
                      v.startsWith("http") ||
                      "Must be a valid URL starting with http",
                  })}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  className={errors.image ? "border-destructive" : ""}
                />
                {errors.image && (
                  <p className="text-sm text-destructive">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input
                  {...register("rating", {
                    validate: (v) => {
                      const n = parseFloat(v);
                      if (isNaN(n)) return "Must be a number";
                      if (n < 0 || n > 5) return "Rating must be 0–5";
                      return true;
                    },
                  })}
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="4.5"
                  className={errors.rating ? "border-destructive" : ""}
                />
                {errors.rating && (
                  <p className="text-sm text-destructive">
                    {errors.rating.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <h2 className="text-xl font-semibold">
              Tags <span className="text-destructive">*</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Add relevant tags to help users discover your tool.
            </p>

            <div className="flex gap-2">
              <Input
                placeholder="Add a tag (e.g., api, testing)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" onClick={addTag} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {tags.length === 0 && (
              <p className="text-sm text-destructive">
                At least one tag is required
              </p>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <h2 className="text-xl font-semibold">Features (Optional)</h2>
            <p className="text-sm text-muted-foreground">
              List key features of your tool.
            </p>

            <div className="flex gap-2">
              <Input
                placeholder="Add a feature (e.g., REST support)"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
              />
              <Button type="button" onClick={addFeature} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {features.length > 0 && (
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <span className="text-sm">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none"
            >
              {isSubmitting ? "Creating..." : "Create Tool"}
            </Button>
            <Button type="button" variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </div>

      <div className="h-20" />
    </div>
  );
}
