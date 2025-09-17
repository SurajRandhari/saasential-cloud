import { FormSection } from "@/components/ui/form-section";
import { FormInput } from "@/components/ui/form-input";
import { Settings } from "lucide-react";

export function PostDetails({ formData, onTitleChange, onSlugChange }) {
  return (
    <FormSection title="Post Details" icon={<Settings className="h-5 w-5" />}>
      <FormInput
        id="title"
        label="Title"
        value={formData.title}
        onChange={onTitleChange}
        placeholder="Enter an engaging post title..."
        required
      />

      <div>
        <FormInput
          id="slug"
          label="URL Slug"
          value={formData.slug}
          onChange={onSlugChange}
          placeholder="url-friendly-slug"
          helperText={`yoursite.com/blog/${formData.slug || "post-slug"}`}
        />
        {formData.slugIsDirty && (
          <p className="text-xs text-blue-600 mt-1">
            Custom slug (won't auto-update from title)
          </p>
        )}
      </div>

      <FormInput
        id="excerpt"
        label="Excerpt"
        value={formData.excerpt}
        onChange={(value) => onTitleChange("excerpt", value)}
        placeholder="Brief description that appears in previews..."
        multiline
        rows={3}
        maxLength={160}
      />
    </FormSection>
  );
}
