import { FormSection } from "@/components/ui/form-section";
import { FormSelect } from "@/components/ui/form-select";
import { TagInput } from "@/components/ui/tag-input";
import { Tag } from "lucide-react";

const categoryOptions = [
  { value: "technology", label: "Technology" },
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "tutorial", label: "Tutorial" },
  { value: "news", label: "News" },
];

export function CategoriesTags({ formData, onChange, onAddTag, onRemoveTag }) {
  return (
    <FormSection title="Categories & Tags" icon={<Tag className="h-5 w-5" />}>
      <FormSelect
        id="category"
        label="Category"
        options={categoryOptions}
        value={formData.category}
        onChange={(value) => onChange("category", value)}
        placeholder="Select category"
      />

      <TagInput
        label="Tags"
        tags={formData.tags}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
      />
    </FormSection>
  );
}
