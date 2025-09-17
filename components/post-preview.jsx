import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function PostPreview({ formData }) {
  return (
    <article className="space-y-6">
      {/* Header */}
      <header className="border-b pb-6">
        <h1 className="text-4xl font-bold mb-3">
          {formData.title || "Untitled Post"}
        </h1>
        {formData.excerpt && (
          <p className="text-xl text-muted-foreground leading-relaxed">
            {formData.excerpt}
          </p>
        )}
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          {formData.category && (
            <Badge variant="outline">{formData.category}</Badge>
          )}
          {formData.readingTime > 0 && (
            <span>{formData.readingTime} min read</span>
          )}
          <time dateTime={formData.publishDate}>
            {formData.publishDate && 
              new Date(formData.publishDate).toLocaleDateString()
            }
          </time>
        </div>
      </header>

      {/* Featured Image */}
      {formData.featuredImage && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
          <Image
            src={formData.featuredImage}
            alt={formData.altText || "Featured image"}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ 
          __html: formData.content || "<p>Start writing your content...</p>" 
        }}
      />

      {/* Tags */}
      {formData.tags.length > 0 && (
        <footer className="border-t pt-6">
          <h3 className="font-medium mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}
