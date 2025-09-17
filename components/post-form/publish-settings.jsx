import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/ui/form-section";
import { FormSelect } from "@/components/ui/form-select";
import { FormInput } from "@/components/ui/form-input";
import { Calendar } from "lucide-react";

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
];

export function PublishSettings({ formData, onChange }) {
  return (
    <FormSection title="Publishing" icon={<Calendar className="h-5 w-5" />}>
      <FormSelect
        id="status"
        label="Status"
        options={statusOptions}
        value={formData.status}
        onChange={(value) => onChange("status", value)}
      />

      <FormInput
        id="publishDate"
        label="Publish Date"
        type="datetime-local"
        value={formData.publishDate}
        onChange={(value) => onChange("publishDate", value)}
      />

      <div className="flex items-center justify-between">
        <Label htmlFor="featured">Featured Post</Label>
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => onChange("featured", checked)}
        />
      </div>
    </FormSection>
  );
}
