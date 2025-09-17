import { FormSection } from "@/components/ui/form-section";
import { FormInput } from "@/components/ui/form-input";
import { Globe } from "lucide-react";

export function SEOSettings({ formData, onChange }) {
  return (
    <FormSection title="SEO Settings" icon={<Globe className="h-5 w-5" />}>
      <FormInput
        id="metaTitle"
        label="Meta Title"
        value={formData.metaTitle}
        onChange={(value) => onChange("metaTitle", value)}
        placeholder="SEO title (60 chars max)"
        maxLength={60}
      />

      <FormInput
        id="metaDescription"
        label="Meta Description"
        value={formData.metaDescription}
        onChange={(value) => onChange("metaDescription", value)}
        placeholder="SEO description (160 chars max)"
        multiline
        rows={3}
        maxLength={160}
      />
    </FormSection>
  );
}
