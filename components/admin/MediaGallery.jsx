"use client";

import { useState, useEffect } from 'react';
import { CldImage, CldVideoPlayer } from 'next-cloudinary';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Trash2, Download, Copy, Play, Image as ImageIcon, Video, Filter } from 'lucide-react';

export default function MediaGallery({ category }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, [category]);

  const fetchMedia = async () => {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      
      const response = await fetch(`/api/media?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setMedia(data.media);
      } else {
        toast.error('Failed to fetch media');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id) => {
    try {
      const response = await fetch(`/api/media?id=${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMedia(media.filter(item => item.id !== id));
        toast.success('Media deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete media');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete media');
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  // Filter media
  const filteredMedia = media.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">
            {media.length}
          </div>
          <div className="text-sm text-gray-600">Total Media</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {media.filter(item => item.type === 'image').length}
          </div>
          <div className="text-sm text-gray-600">Images</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-purple-600">
            {media.filter(item => item.type === 'video').length}
          </div>
          <div className="text-sm text-gray-600">Videos</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-orange-600">
            {(media.reduce((sum, item) => sum + item.size, 0) / 1024 / 1024).toFixed(1)}MB
          </div>
          <div className="text-sm text-gray-600">Total Size</div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMedia.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No media files found
          </div>
        ) : (
          filteredMedia.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <div className="relative aspect-video bg-gray-100">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <CldVideoPlayer
                      src={item.publicId}
                      width="300"
                      height="200"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <CldImage
                    src={item.publicId}
                    alt={item.altText || item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                )}

                {/* Overlay Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                      onClick={() => copyUrl(item.url)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Media</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{item.title}"? 
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMedia(item.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.type === 'video' ? (
                      <><Video className="h-3 w-3 mr-1" /> Video</>
                    ) : (
                      <><ImageIcon className="h-3 w-3 mr-1" /> Image</>
                    )}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-3">
                <h3 className="font-semibold text-sm mb-1 truncate" title={item.title}>
                  {item.title || 'Untitled'}
                </h3>
                
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {item.description || 'No description'}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{item.width} × {item.height}</span>
                  <span>{(item.size / 1024 / 1024).toFixed(1)}MB</span>
                </div>

                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
