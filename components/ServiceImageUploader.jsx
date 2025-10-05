"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";

export function ServiceImageUploader({ label, value, onChange, folder = "services" }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UNSIGNED_PRESET"); // Set your unsigned preset name here
    formData.append("folder", folder);

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
        toast.success(label + " uploaded!");
      } else {
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <Input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      {uploading && <span className="text-xs text-muted-foreground">Uploading...</span>}
      {value && <img src={value} alt={label} className="h-20 w-auto border rounded mt-2" />}
    </div>
  );
}
