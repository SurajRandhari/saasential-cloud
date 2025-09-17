"use client";

import { useState, useCallback } from 'react';
import { CldUploadWidget, CldImage, CldVideoPlayer } from 'next-cloudinary';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Play, Image as ImageIcon, Video, FileText } from 'lucide-react';

export default function MediaUploader({ onUploadSuccess, category = 'website' }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState(null);
  const [mediaDetails, setMediaDetails] = useState({
    title: '',
    description: '',
    altText: '',
    tags: ''
  });

  const handleUploadSuccess = useCallback(async (result) => {
    console.log('Upload success:', result);
    
    const mediaData = {
      title: mediaDetails.title,
      description: mediaDetails.description,
      url: result.info.secure_url,
      publicId: result.info.public_id,
      type: result.info.resource_type, // 'image' or 'video'
      category: category,
      size: result.info.bytes,
      width: result.info.width,
      height: result.info.height,
      format: result.info.format,
      altText: mediaDetails.altText,
      tags: mediaDetails.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    try {
      // Save to database
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mediaData),
      });

      const data = await response.json();

      if (data.success) {
        setUploadedMedia({ ...mediaData, id: data.id });
        toast.success('Media uploaded and saved successfully!');
        onUploadSuccess?.(mediaData);
      } else {
        toast.error('Failed to save media details');
      }
    } catch (error) {
      console.error('Error saving media:', error);
      toast.error('Failed to save media details');
    }

    setUploading(false);
  }, [mediaDetails, category, onUploadSuccess]);

  const handleUploadError = useCallback((error) => {
    console.error('Upload error:', error);
    toast.error('Upload failed: ' + (error.message || 'Unknown error'));
    setUploading(false);
  }, []);

  const handleInputChange = (field, value) => {
    setMediaDetails(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setUploadedMedia(null);
    setMediaDetails({
      title: '',
      description: '',
      altText: '',
      tags: ''
    });
  };

  const getMediaIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'image':
        return <ImageIcon className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Media
        </CardTitle>
        <CardDescription>
          Upload images and videos for your website. Files will be optimized automatically.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Media Details Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter media title"
              value={mediaDetails.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="altText">Alt Text (for images)</Label>
            <Input
              id="altText"
              placeholder="Describe the image for accessibility"
              value={mediaDetails.altText}
              onChange={(e) => handleInputChange('altText', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter media description"
            value={mediaDetails.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            placeholder="homepage, hero, banner, etc."
            value={mediaDetails.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
          />
        </div>

        {/* Upload Widget */}
        <div className="space-y-4">
          <CldUploadWidget
            uploadPreset="media_unsigned" // Make sure this preset exists and is unsigned
            onSuccess={handleUploadSuccess}
            onError={handleUploadError}
            onOpen={() => setUploading(true)}
            onClose={() => setUploading(false)}
            options={{
              maxFiles: 1,
              resourceType: 'auto', // Allows both images and videos
              maxFileSize: 100000000, // 100MB
              folder: `media/${category}`,
              allowedFormats: [
                // Images
                'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
                // Videos
                'mp4', 'mov', 'avi', 'wmv', 'flv', 'webm', 'mkv'
              ],
              transformation: [
                // Auto-optimize quality and format
                { quality: 'auto', fetch_format: 'auto' },
                // Limit max dimensions for images
                { if: 'w_gt_1920', width: 1920, crop: 'limit' },
                { if: 'h_gt_1080', height: 1080, crop: 'limit' }
              ],
              // Video-specific optimizations
              videoTransformation: [
                { quality: 'auto', format: 'auto' },
                { width: 1920, height: 1080, crop: 'limit' },
                { video_codec: 'auto' }
              ]
            }}
          >
            {({ open }) => (
              <Button 
                onClick={() => open?.()}
                disabled={uploading}
                className="w-full"
                size="lg"
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? 'Uploading...' : 'Choose File to Upload'}
              </Button>
            )}
          </CldUploadWidget>

          <div className="text-sm text-gray-500 space-y-1">
            <p><strong>Supported formats:</strong></p>
            <p><strong>Images:</strong> JPG, PNG, GIF, WebP, SVG (max 100MB)</p>
            <p><strong>Videos:</strong> MP4, MOV, AVI, WMV, WebM, MKV (max 100MB)</p>
            <p><strong>Features:</strong> Automatic optimization, format conversion, and quality adjustment</p>
          </div>
        </div>

        {/* Preview Uploaded Media */}
        {uploadedMedia && (
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Uploaded Successfully!</h3>
              <Button variant="outline" size="sm" onClick={resetForm}>
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Media Preview */}
              <div>
                {uploadedMedia.type === 'video' ? (
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <CldVideoPlayer
                      src={uploadedMedia.publicId}
                      width="640"
                      height="360"
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <CldImage
                      src={uploadedMedia.publicId}
                      alt={uploadedMedia.altText || uploadedMedia.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Media Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {getMediaIcon(uploadedMedia.type)}
                  <Badge variant="outline">
                    {uploadedMedia.type?.toUpperCase()}
                  </Badge>
                  <Badge variant="secondary">
                    {uploadedMedia.format?.toUpperCase()}
                  </Badge>
                </div>

                <div>
                  <p className="font-semibold text-lg">{uploadedMedia.title}</p>
                  <p className="text-gray-600">{uploadedMedia.description}</p>
                </div>

                <div className="text-sm space-y-1">
                  <p><strong>Dimensions:</strong> {uploadedMedia.width} × {uploadedMedia.height}px</p>
                  <p><strong>File Size:</strong> {(uploadedMedia.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p><strong>Category:</strong> {uploadedMedia.category}</p>
                </div>

                {uploadedMedia.tags.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {uploadedMedia.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <p className="text-xs text-gray-500 break-all">
                    <strong>URL:</strong> {uploadedMedia.url}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
