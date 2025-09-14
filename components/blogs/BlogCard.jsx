"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

export function BlogCard({ blog }) {
  // Function to strip HTML tags and limit to 30 words
  const getPlainTextDescription = (htmlContent, wordLimit = 30) => {
    if (!htmlContent) return '';
    
    // Remove HTML tags
    const plainText = htmlContent.replace(/<[^>]*>/g, ' ');
    // Clean up extra spaces
    const cleanText = plainText.replace(/\s+/g, ' ').trim();
    // Split into words and limit to specified number
    const words = cleanText.split(' ').slice(0, wordLimit);
    return words.join(' ') + (cleanText.split(' ').length > wordLimit ? '...' : '');
  };

  return (
    <div className="bg-gray-50 relative dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[320px] h-[420px] sm:w-[350px] sm:h-[420px] border flex flex-col">
      
      {/* Image at the top with category overlay */}
      <div className="w-full mb-2 relative">
        <div className="relative w-full h-[180px]">
          <Image
            src={blog.image || "/images/placeholder-blog.jpg"}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 350px"
            priority={false}
          />
          
          {/* Category overlay on top-right corner */}
          {blog.category && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full shadow-sm">
                {blog.category}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Time & Date */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{blog.readingTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-600 dark:text-white line-clamp-2 mb-2">
          {blog.title}
        </h3>

        {/* Description - exactly 30 words, plain text only */}
        <p className="text-neutral-500 text-sm dark:text-neutral-300 mb-4 flex-grow">
          {getPlainTextDescription(blog.description, 30)}
        </p>

        {/* Read More button at bottom */}
        <div className="mt-auto">
          <Link
            href={blog.link}
            className="block w-full px-4 py-2 bg-black dark:bg-white dark:text-black text-white text-sm font-medium rounded-xl text-center hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}
