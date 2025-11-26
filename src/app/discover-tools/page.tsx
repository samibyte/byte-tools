"use client";

import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ToolCard from "@/components/ToolCard";

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

export default function DiscoverTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tools from API
  useEffect(() => {
    async function fetchTools() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/tools");

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

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(tools.map((tool) => tool.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, [tools]);

  // Filter tools based on search & category
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = tool.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tools, search, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b bg-linear-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Discover Tools
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore {tools.length} curated developer tools to enhance your
              workflow and boost productivity.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search, Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredTools.length}{" "}
              {filteredTools.length === 1 ? "tool" : "tools"} found
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[400px] rounded-lg bg-muted animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Tools Grid */}
        {!isLoading && filteredTools.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool._id}
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
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
