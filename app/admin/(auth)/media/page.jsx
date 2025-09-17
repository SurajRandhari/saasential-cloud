"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Image as ImageIcon, Video, Folder } from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';
import MediaGallery from '@/components/admin/MediaGallery';

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleUploadSuccess = (mediaData) => {
    // Refresh gallery or handle success
    console.log('Media uploaded:', mediaData);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Media Library</h1>
        <p className="text-gray-600">
          Upload and manage images and videos for your website. All files are automatically optimized for performance.
        </p>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Media
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            Media Gallery
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MediaUploader 
                onUploadSuccess={handleUploadSuccess}
                category={activeCategory === 'all' ? 'website' : activeCategory}
              />
            </div>

            <div className="space-y-4">
              {/* Category Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                  <CardDescription>
                    Choose where to organize your media
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { id: 'homepage', label: 'Homepage', icon: ImageIcon },
                      { id: 'website', label: 'General Website', icon: Folder },
                      { id: 'hero', label: 'Hero Sections', icon: Video },
                      { id: 'about', label: 'About Page', icon: ImageIcon },
                      { id: 'services', label: 'Services', icon: Folder }
                    ].map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center gap-2 p-3 rounded-lg text-left transition-colors ${
                          activeCategory === category.id
                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                            : 'hover:bg-gray-50 border-transparent'
                        } border`}
                      >
                        <category.icon className="h-4 w-4" />
                        {category.label}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upload Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-green-600">✅ Best Practices</h4>
                    <ul className="text-sm text-gray-600 space-y-1 mt-1">
                      <li>• Use descriptive titles</li>
                      <li>• Add relevant tags</li>
                      <li>• Include alt text for images</li>
                      <li>• Upload high-quality originals</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-600">🔒 Security</h4>
                    <ul className="text-sm text-gray-600 space-y-1 mt-1">
                      <li>• All files are scanned</li>
                      <li>• Only approved formats</li>
                      <li>• Secure cloud storage</li>
                      <li>• Automatic backups</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Gallery Tab */}
        <TabsContent value="gallery" className="space-y-6">
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="homepage">Homepage</TabsTrigger>
              <TabsTrigger value="website">Website</TabsTrigger>
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <MediaGallery />
            </TabsContent>
            <TabsContent value="homepage">
              <MediaGallery category="homepage" />
            </TabsContent>
            <TabsContent value="website">
              <MediaGallery category="website" />
            </TabsContent>
            <TabsContent value="hero">
              <MediaGallery category="hero" />
            </TabsContent>
            <TabsContent value="about">
              <MediaGallery category="about" />
            </TabsContent>
            <TabsContent value="services">
              <MediaGallery category="services" />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
