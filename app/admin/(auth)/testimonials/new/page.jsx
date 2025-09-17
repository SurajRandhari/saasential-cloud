"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star } from "lucide-react";
import Link from 'next/link';
import { FeaturedImageUploader } from "@/components/ui/featured-image-uploader";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    heading: '',
    testimony: '',
    name: '',
    image: '',
    city: '',
    company: '',
    position: '',
    rating: 5,
    status: 'published',
    featured: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.testimony) {
      toast.error('Please fill in required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Testimonial created successfully');
        router.push('/admin/testimonials');
      } else {
        toast.error(data.error || 'Failed to create testimonial');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create testimonial');
    } finally {
      setLoading(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleInputChange('rating', index + 1)}
            className="focus:outline-none"
          >
            <Star 
              className={`w-6 h-6 transition-colors ${
                index < formData.rating 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300 hover:text-yellow-200'
              }`} 
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">({formData.rating} stars)</span>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Buttons on Right */}
      <div className="flex justify-between items-center">
      <Link href="/admin/testimonials">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Testimonials
          </Button>
        </Link>

        <div>
          <h1 className="text-2xl font-bold">Create New Testimonial</h1>
          <p className="text-gray-600">Add a new customer testimonial</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/testimonials">
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            form="testimonialForm" 
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Testimonial'}
          </Button>
        </div>
      </div>

      <form id="testimonialForm" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Testimonial Details</CardTitle>
                <CardDescription>Enter the testimonial content and details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="heading">Testimonial Heading</Label>
                  <Input
                    id="heading"
                    placeholder="e.g., Excellent Service!"
                    value={formData.heading}
                    onChange={(e) => handleInputChange('heading', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="testimony">Testimonial Text *</Label>
                  <Textarea
                    id="testimony"
                    placeholder="Enter the testimonial content..."
                    value={formData.testimony}
                    onChange={(e) => handleInputChange('testimony', e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <Label>Rating</Label>
                  {renderStarRating()}
                </div>
              </CardContent>
            </Card>

            {/* Person Details */}
            <Card>
              <CardHeader>
                <CardTitle>Person Details</CardTitle>
                <CardDescription>Information about the person giving testimonial</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="e.g., New York"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="e.g., ABC Corp"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      placeholder="e.g., CEO"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Image */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Image</CardTitle>
                <CardDescription>Upload person's profile photo</CardDescription>
              </CardHeader>
              <CardContent>
                <FeaturedImageUploader
                  image={formData.image}
                  onImageChange={(value) => handleInputChange('image', value)}
                  altText={`${formData.name} profile photo`}
                  onAltTextChange={() => {}}
                />
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Publication Settings</CardTitle>
                <CardDescription>Control visibility and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(value) => handleInputChange('featured', value)}
                  />
                  <Label htmlFor="featured">Featured Testimonial</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
