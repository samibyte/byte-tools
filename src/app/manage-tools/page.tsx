"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Eye, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

interface Tool {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  tags: string[];
  updatedAt: string;
}

export default function ManageToolsPage() {
  const router = useRouter();
  const [tools, setTools] = useState<Tool[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch tools
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

  // Filter tools
  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle delete
  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/tools/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete tool");
      }

      // Remove from state
      setTools(tools.filter((tool) => tool._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error("Failed to delete tool:", err);
      toast.error("Failed to delete tool. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                Manage Tools
              </h1>
              <p className="text-muted-foreground">
                View, edit, and manage all your tools in one place.
              </p>
            </div>
            <Button
              onClick={() => router.push("/tools/add")}
              className="gap-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Add New Tool
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredTools.length}{" "}
              {filteredTools.length === 1 ? "tool" : "tools"} found
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        )}

        {/* Desktop Table View */}
        {!isLoading && filteredTools.length > 0 && (
          <>
            <div className="hidden lg:block border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">
                      Tool
                    </th>
                    <th className="text-left p-4 font-semibold text-sm">
                      Category
                    </th>
                    <th className="text-left p-4 font-semibold text-sm">
                      Price
                    </th>
                    <th className="text-left p-4 font-semibold text-sm">
                      Rating
                    </th>
                    <th className="text-left p-4 font-semibold text-sm">
                      Updated
                    </th>
                    <th className="text-right p-4 font-semibold text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredTools.map((tool) => (
                    <tr
                      key={tool._id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted shrink-0">
                            <Image
                              src={tool.image}
                              alt={tool.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{tool.title}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {tool.description.substring(0, 50)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary">{tool.category}</Badge>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold">
                          ${tool.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">
                          {tool.rating.toFixed(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-muted-foreground">
                          {new Date(tool.updatedAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              router.push(`/tool-details/${tool._id}`)
                            }
                            className="gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteId(tool._id)}
                            className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden space-y-4">
              {filteredTools.map((tool) => (
                <div
                  key={tool._id}
                  className="bg-card border rounded-lg p-4 space-y-4"
                >
                  {/* Tool Info */}
                  <div className="flex gap-3">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-muted shrink-0">
                      <Image
                        src={tool.image}
                        alt={tool.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 truncate">
                        {tool.title}
                      </h3>
                      <Badge variant="secondary" className="mb-2">
                        {tool.category}
                      </Badge>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Price: </span>
                      <span className="font-semibold">
                        ${tool.price.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rating: </span>
                      <span>{tool.rating.toFixed(1)}</span>
                    </div>
                    <div className="ml-auto text-muted-foreground">
                      {new Date(tool.updatedAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/tools/${tool._id}`)}
                      className="flex-1 gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(tool._id)}
                      className="flex-1 gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && filteredTools.length === 0 && (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-6">
              {search
                ? "Try adjusting your search criteria"
                : "Get started by adding your first tool"}
            </p>
            {!search && (
              <Button
                onClick={() => router.push("/tools/add")}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add New Tool
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              tool from the marketplace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bottom Spacing */}
      <div className="h-20" />
    </div>
  );
}
