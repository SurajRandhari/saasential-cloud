"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormSection } from "@/components/ui/form-section";
import { FeaturedImageUploader } from "@/components/ui/featured-image-uploader";
import { RichTextEditor } from "@/components/rich-text-editor";
import { PostDetails } from "@/components/post-form/post-details";
import { PublishSettings } from "@/components/post-form/publish-settings";
import { CategoriesTags } from "@/components/post-form/categories-tags";
import { SEOSettings } from "@/components/post-form/seo-settings";
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { PostPreview } from "@/components/post-preview";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "",
    tags: [],
    status: "draft",
    featured: false,
    publishDate: "",
    metaTitle: "",
    metaDescription: "",
    featuredImage: "",
    altText: "",
    readingTime: 0,
    slugIsDirty: false,
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch post data on component mount
  useEffect(() => {
    async function fetchPost() {
      const loadingToast = toast.loading("Loading post...");
      
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Post not found');
          }
          throw new Error('Failed to load post');
        }
        
        const post = await response.json();
        setFormData({
          ...post,
          slugIsDirty: true // Prevent auto-slug generation for existing posts
        });
        
        toast.dismiss(loadingToast);
        toast.success("Post loaded successfully");
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.dismiss(loadingToast);
        toast.error("Failed to load post", {
          description: error.message
        });
        
        // Redirect to posts list after a delay
        setTimeout(() => {
          router.push('/admin/content/posts');
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    }

    if (postId) {
      fetchPost();
    }
  }, [postId, router]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "content") {
        const wordCount = value.replace(/<[^>]*>/g, "").split(/\s+/).length;
        newData.readingTime = Math.ceil(wordCount / 200);
      }
      return newData;
    });
  };

  const handleTitleChange = (value) => {
    setFormData((prev) => {
      const newData = { ...prev, title: value };
      if (!prev.slugIsDirty) {
        newData.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }
      return newData;
    });
  };

  const handleSlugChange = (value) => {
    setFormData((prev) => ({ ...prev, slug: value, slugIsDirty: true }));
  };

  const addTag = (tag) => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a title for your post");
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error("Please add some content to your post");
      return;
    }
    
    setIsSaving(true);
    const savingToast = toast.loading("Updating your post...");
    
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          updatedAt: new Date()
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.dismiss(savingToast);
        toast.success("✅ Post updated successfully!", {
          description: `"${formData.title}" has been updated`,
          action: {
            label: "View Posts",
            onClick: () => router.push('/admin/content/posts')
          }
        });
        
        // Small delay to show the success toast
        setTimeout(() => {
          router.push('/admin/content/posts');
        }, 1500);
      } else {
        throw new Error(result.error || 'Failed to update post');
      }
    } catch (error) {
      toast.dismiss(savingToast);
      toast.error("Failed to update post", {
        description: error.message || "Please try again"
      });
      console.error('Error updating post:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/content/posts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Posts
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin" />
            <div>
              <h1 className="text-2xl font-bold">Loading Post...</h1>
              <p className="text-muted-foreground">Please wait while we fetch your post</p>
            </div>
          </div>
        </div>
        
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/content/posts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Edit Post</h1>
              <p className="text-muted-foreground">
                Update your blog post
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsPreviewOpen(true)}
              disabled={isSaving}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSaving || !formData.title.trim()}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Updating...' : 'Update Post'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <PostDetails
              formData={formData}
              onTitleChange={handleTitleChange}
              onSlugChange={handleSlugChange}
            />

            <FormSection title="Content" icon={null}>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => handleInputChange("content", content)}
                placeholder="Start writing your amazing post..."
              />
              {formData.readingTime > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Estimated reading time: {formData.readingTime} minute
                  {formData.readingTime !== 1 ? "s" : ""}
                </p>
              )}
            </FormSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PublishSettings formData={formData} onChange={handleInputChange} />
            <CategoriesTags
              formData={formData}
              onChange={handleInputChange}
              onAddTag={addTag}
              onRemoveTag={removeTag}
            />

            <FormSection title="Featured Image">
              <FeaturedImageUploader
                image={formData.featuredImage}
                onImageChange={(value) =>
                  handleInputChange("featuredImage", value)
                }
                altText={formData.altText}
                onAltTextChange={(value) => handleInputChange("altText", value)}
              />
            </FormSection>

            <SEOSettings formData={formData} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Preview: {formData.title || "Untitled Post"}
            </DialogTitle>
          </DialogHeader>
          <PostPreview formData={formData} />
        </DialogContent>
      </Dialog>
    </>
  );
}
