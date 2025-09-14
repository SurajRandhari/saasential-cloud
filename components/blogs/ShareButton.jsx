"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({ title, url }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url || window.location.href
      });
    } else {
      navigator.clipboard.writeText(url || window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white dark:text-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
    >
      <Share2 className="w-4 h-4" />
      Share Article
    </button>
  );
}
