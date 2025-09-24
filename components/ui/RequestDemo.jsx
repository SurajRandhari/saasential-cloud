"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ChevronDown, ChevronUp, Send, X } from 'lucide-react';
import { GradientButton } from '../common/my-button/GradientButton';

export default function RequestDemo() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/request-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Demo request sent successfully! We\'ll contact you soon.');
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
        setShowForm(false);
      } else {
        toast.error(data.error || 'Failed to send demo request');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send demo request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({ name: '', email: '', company: '', phone: '', message: '' });
  };

  return (
    <div className="w-full max-w-2xl mx-auto items-center">
      {/* Request Demo Button */}
      <div className="text-center">
       
            <GradientButton
             onClick={toggleForm}
              variant="gradient"
              className="text-center text-black text-base font-normal leading-tight"
            >
          {showForm ? (
            <>
              <ChevronUp className="mr-2 h-5 w-5" />
              Hide Request Form
            </>
          ) : (
            <>
              Request Demo
              <ChevronDown className="ml-2 h-5 w-5" />
            </>
          )}
          </GradientButton>
      </div>

      {/* Animated Form Container */}
      <div 
        className={`mt-6 transition-all duration-500 ease-in-out transform ${
          showForm 
            ? 'max-h-screen opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
        } overflow-hidden`}
      >
        <Card className="shadow-lg border-1  ">
          <CardHeader className="relative">
            <button
              onClick={closeForm}
              className="absolute right-4 top-1 text-gray-400 hover:text-red-600 hover:bg-red-600/10 hover:rounded-full hover:scale-150 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            
            <CardTitle className="text-2xl font-bold text-gray-900">
              Request a Demo
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours to schedule your personalized demo.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    placeholder="Enter your company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your requirements, team size, or specific features you're interested in..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
             
                    <GradientButton
                     type="submit"
                     disabled={loading}
              variant="gradient"
              className="text-center text-black text-base font-normal leading-tight"
            >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Demo Request
                    </>
                  )}
                  </GradientButton>
             
              </div>

              {/* Footer Note */}
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our Privacy Policy. We'll only use your information to schedule and conduct your demo.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
