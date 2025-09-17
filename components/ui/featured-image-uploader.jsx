"use client";

import { useState, useRef } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Link as LinkIcon } from "lucide-react";

export function FeaturedImageUploader({
  image,
  onImageChange,
  altText,
  onAltTextChange,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const scrollYRef = useRef(0); // Store scroll position

  // Function to reset scroll lock
  const resetScrollLock = () => {
    setIsUploading(false);
    
    // Clear scroll lock styles
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.paddingRight = '';
    
    // Restore scroll position
    setTimeout(() => {
      window.scrollTo(0, scrollYRef.current);
    }, 50);
  };

  // Save scroll position when opening widget
  const handleOpen = () => {
    scrollYRef.current = window.scrollY;
    setIsUploading(true);
  };

  const handleCloudinarySuccess = (result) => {
    console.log('✅ Cloudinary upload success:', result);
    onImageChange(result.info.secure_url);
    toast.success("Image uploaded to Cloudinary successfully!");
    resetScrollLock(); // Fix scroll here
  };

  const handleCloudinaryError = (error) => {
    console.error('❌ Cloudinary upload error:', error);
    toast.error("Upload failed: " + (error.message || 'Unknown error'));
    resetScrollLock(); // Fix scroll here too
  };

  const handleUrlUpload = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      onImageChange(url);
    }
  };

  const removeImage = () => {
    onImageChange("");
    onAltTextChange("");
  };

  return (
    <div className="space-y-4">
      {image ? (
        <div className="space-y-4">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border">
            {image.startsWith("https://res.cloudinary.com") ? (
              <CldImage
                src={image}
                alt={altText || "Featured image"}
                fill
                className="object-cover"
                crop="fill"
                gravity="auto"
              />
            ) : (
              <img
                src={image}
                alt={altText || "Featured image"}
                className="w-full h-full object-cover"
              />
            )}
            
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor="altText">Alt Text</Label>
            <Input
              id="altText"
              placeholder="Describe the image for accessibility"
              value={altText}
              onChange={(e) => onAltTextChange(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-6">
            Upload your blog featured image
          </p>

          {/* Cloudinary Upload Widget */}
          <div className="space-y-3">
            <CldUploadWidget
              uploadPreset="blog_unsigned" 
              onSuccess={handleCloudinarySuccess}
              onError={handleCloudinaryError}
              onOpen={handleOpen} // Save scroll position
              onClose={resetScrollLock} // IMPORTANT: Reset scroll on close
              options={{
                maxFiles: 1,
                resourceType: 'image',
                maxFileSize: 10000000, // 10MB
                folder: 'blog-posts',
                transformation: [
                  { width: 1200, height: 630, crop: 'limit' },
                  { quality: 'auto', fetch_format: 'auto' }
                ]
              }}
            >
              {({ open }) => (
                <Button 
                  onClick={() => open?.()}
                  disabled={isUploading}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? 'Uploading to Cloudinary...' : 'Upload to Cloudinary'}
                </Button>
              )}
            </CldUploadWidget>

            <Button 
              variant="outline"
              onClick={handleUrlUpload}
              disabled={isUploading} 
              className="w-full"
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              Or paste image URL
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Supports: JPG, PNG, GIF, WebP (max 10MB)
          </p>
        </div>
      )}
    </div>
  );
}
