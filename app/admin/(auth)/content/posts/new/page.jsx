"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";
import { PostPreview } from "@/components/post-preview";

export default function NewPostPage() {
  const router = useRouter();
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

  // Refs to store original scroll values
  const originalScrollY = useRef(0);
  const originalOverflow = useRef('');

  // Custom scroll lock hook
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (isPreviewOpen) {
      // Store original values
      originalScrollY.current = window.scrollY;
      originalOverflow.current = body.style.overflow;
      
      // Lock scroll
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${originalScrollY.current}px`;
      body.style.width = '100%';
    } else {
      // Restore scroll
      body.style.overflow = originalOverflow.current || 'unset';
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      
      // Restore scroll position
      if (originalScrollY.current !== 0) {
        window.scrollTo({
          top: originalScrollY.current,
          behavior: 'auto'
        });
      }
    }

    return () => {
      // Cleanup on unmount
      body.style.overflow = 'unset';
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
    };
  }, [isPreviewOpen]);

  // Global scroll restoration function
  const restoreScroll = () => {
    const body = document.body;
    const html = document.documentElement;
    
    // Remove any overflow restrictions
    body.style.overflow = 'unset';
    body.style.position = 'unset';
    body.style.top = '';
    body.style.width = '';
    html.style.overflow = 'unset';
    
    // Force scroll restoration with small delay
    setTimeout(() => {
      const currentScroll = window.scrollY;
      window.scrollTo({
        top: currentScroll,
        behavior: 'auto'
      });
    }, 100);
  };

  // Handle any upload completion or DOM changes that might affect scroll
  useEffect(() => {
    const handleResize = () => {
      if (!isPreviewOpen) {
        restoreScroll();
      }
    };

    const handleFocus = () => {
      if (!isPreviewOpen) {
        restoreScroll();
      }
    };

    // Listen for potential scroll-affecting events
    window.addEventListener('resize', handleResize);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('focus', handleFocus);
      // Final cleanup
      document.body.style.overflow = 'unset';
    };
  }, [isPreviewOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "content") {
        const wordCount = value.replace(/<[^>]*>/g, "").split(/\s+/).length;
        newData.readingTime = Math.ceil(wordCount / 200);
      }
      
      // Force scroll restoration after state changes that might affect layout
      if (field === "featuredImage") {
        setTimeout(restoreScroll, 200);
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

  const handlePreviewOpen = () => {
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
    // Give modal time to close, then ensure scroll is restored
    setTimeout(restoreScroll, 150);
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
    const savingToast = toast.loading("Creating your post...");
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.dismiss(savingToast);
        toast.success("🎉 Post created successfully!", {
          description: `"${formData.title}" has been saved as ${formData.status}`,
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
        throw new Error(result.error || 'Failed to create post');
      }
    } catch (error) {
      toast.dismiss(savingToast);
      toast.error("Failed to create post", {
        description: error.message || "Please try again"
      });
      console.error('Error creating post:', error);
    } finally {
      setIsSaving(false);
      // Restore scroll after save operation
      setTimeout(restoreScroll, 100);
    }
  };

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
              <h1 className="text-2xl font-bold">Create New Post</h1>
              <p className="text-muted-foreground">
                Write and publish your blog post
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handlePreviewOpen}
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
              {isSaving ? 'Saving...' : 'Save Post'}
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
                onImageChange={(value) => {
                  handleInputChange("featuredImage", value);
                  // Additional scroll restoration after image upload
                  setTimeout(restoreScroll, 300);
                }}
                altText={formData.altText}
                onAltTextChange={(value) => handleInputChange("altText", value)}
              />
            </FormSection>

            <SEOSettings formData={formData} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={handlePreviewClose}>
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
