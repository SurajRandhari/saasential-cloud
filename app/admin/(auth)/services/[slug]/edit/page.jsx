"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RichTextEditor } from "@/components/rich-text-editor";
import { toast } from "sonner";
import { Trash2, Plus, ArrowLeft } from "lucide-react";

const blankSubservice = {
  name: "",
  slug: "",
  description: "",
  keyPoints: "",
  image: null,
  imageAlt: "",
  details: "",
};

export default function EditServicePage() {
  const router = useRouter();
  const { slug } = useParams();

  const [service, setService] = useState({
    name: "",
    slug: "",
    bannerImage: null, // will use a file for new uploads, or URL for existing
    title: "",
    subtitle: "",
    industries: [],
    subservices: [],
    seo: {
      title: "",
      description: "",
      keywords: "",
      openGraph: { title: "", description: "", image: null, url: "" },
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${slug}`);
        if (!res.ok) throw new Error("Service not found");
        const data = await res.json();
        setService({
          name: data.name || "",
          slug: data.slug || "",
          // We store the URL/metadata for existing images, allow file input to replace
          bannerImage: data.bannerImage || null,
          title: data.title || "",
          subtitle: data.subtitle || "",
          industries: data.industries || [],
          subservices: (data.subservices ?? []).map((sub) => ({
            name: sub.name || "",
            slug: sub.slug || "",
            description: sub.description || "",
            keyPoints: (sub.keyPoints || []).join("\n"),
            image: null, // new file for replacement only!
            imageAlt: sub.image?.alt || "",
            details: sub.details || "",
            currentImage: sub.image?.secure_url || "", // For preview
          })),
          seo: {
            title: data.seo?.title || "",
            description: data.seo?.description || "",
            keywords: data.seo?.keywords || "",
            openGraph: {
              title: data.seo?.openGraph?.title || "",
              description: data.seo?.openGraph?.description || "",
              image: null,
              url: data.seo?.openGraph?.url || "",
              currentImage: data.seo?.openGraph?.image || "",
            },
          },
        });
      } catch (err) {
        toast.error(err.message);
        router.push("/admin/services");
      } finally {
        setIsLoading(false);
      }
    }
    fetchService();
  }, [slug, router]);

  // UI helpers
  const handleChange = (field, value) =>
    setService((prev) => ({ ...prev, [field]: value }));

  // Subservice logic
  const addSubservice = () =>
    setService((prev) => ({
      ...prev,
      subservices: [...prev.subservices, { ...blankSubservice }],
    }));

  const handleSubChange = (idx, field, value) => {
    const subservices = [...service.subservices];
    subservices[idx][field] = value;
    setService((prev) => ({ ...prev, subservices }));
  };

  const removeSub = (idx) =>
    setService((prev) => ({
      ...prev,
      subservices: prev.subservices.filter((_, i) => i !== idx),
    }));

  // Industries
  const addIndustry = () =>
    setService((prev) => ({
      ...prev,
      industries: [...prev.industries, { name: "", detail: "" }],
    }));

  const handleIndustryChange = (idx, field, value) => {
    const industries = [...service.industries];
    industries[idx][field] = value;
    setService((prev) => ({ ...prev, industries }));
  };

  const removeIndustry = (idx) =>
    setService((prev) => ({
      ...prev,
      industries: prev.industries.filter((_, i) => i !== idx),
    }));

  // SEO Handlers
  const handleSEOChange = (field, value) =>
    setService((prev) => ({
      ...prev,
      seo: { ...prev.seo, [field]: value },
    }));

  const handleOGChange = (field, value) =>
    setService((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        openGraph: { ...prev.seo.openGraph, [field]: value },
      },
    }));

  // File handlers
  const handleBannerFile = (e) =>
    setService((prev) => ({ ...prev, bannerImage: e.target.files[0] }));

  const handleOGFile = (e) =>
    setService((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        openGraph: { ...prev.seo.openGraph, image: e.target.files[0] },
      },
    }));

  const handleSubFile = (idx, e) => {
    const subservices = [...service.subservices];
    subservices[idx].image = e.target.files[0];
    setService((prev) => ({ ...prev, subservices }));
  };

  // --- SUBMIT as FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", service.name);
      fd.append("slug", service.slug);
      if (service.bannerImage instanceof File)
        fd.append("bannerImage", service.bannerImage);
      fd.append("title", service.title);
      fd.append("subtitle", service.subtitle);

      fd.append("seoTitle", service.seo.title);
      fd.append("seoDescription", service.seo.description);
      fd.append("seoKeywords", service.seo.keywords);
      fd.append("ogTitle", service.seo.openGraph.title);
      fd.append("ogDescription", service.seo.openGraph.description);
      if (service.seo.openGraph.image instanceof File)
        fd.append("ogImage", service.seo.openGraph.image);
      fd.append("ogUrl", service.seo.openGraph.url);

      service.industries.forEach((ind, idx) => {
        fd.append(`industries[${idx}][name]`, ind.name);
        fd.append(`industries[${idx}][detail]`, ind.detail);
      });

      service.subservices.forEach((sub, idx) => {
        fd.append(`subservices[${idx}][name]`, sub.name);
        fd.append(`subservices[${idx}][slug]`, sub.slug);
        fd.append(`subservices[${idx}][description]`, sub.description);
        fd.append(`subservices[${idx}][keyPoints]`, sub.keyPoints);
        if (sub.image instanceof File)
          fd.append(`subservices[${idx}][image]`, sub.image);
        fd.append(`subservices[${idx}][imageAlt]`, sub.imageAlt);
        fd.append(`subservices[${idx}][details]`, sub.details);
      });

      const res = await fetch(`/api/services/${slug}`, {
        method: "PUT",
        body: fd,
      });
      if (!res.ok) throw new Error("Failed to update service");
      toast.success("Service updated!");
      router.push("/admin/services");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <p>Loading service data...</p>;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isSaving}>
          {isSaving ? "Saving..." : "Update Service"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Service Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Service Name"
              value={service.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            <Input placeholder="Slug" value={service.slug} disabled />
            <div>
              <label className="text-sm font-medium">Banner Image</label>
              <Input type="file" accept="image/*" onChange={handleBannerFile} />
              {service.bannerImage &&
                !(service.bannerImage instanceof File) && (
                  <img
                    src={service.bannerImage.secure_url || service.bannerImage}
                    alt="Banner"
                    className="h-20 my-2 rounded border"
                  />
                )}
            </div>
            <Input
              placeholder="Page Title"
              value={service.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Textarea
              placeholder="Subtitle"
              value={service.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              rows={2}
            />
          </CardContent>
        </Card>
        {/* SEO & Open Graph */}
        <Card>
          <CardHeader>
            <CardTitle>SEO & Open Graph</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="SEO Title"
              value={service.seo.title}
              onChange={(e) => handleSEOChange("title", e.target.value)}
            />
            <Textarea
              placeholder="SEO Description"
              value={service.seo.description}
              onChange={(e) => handleSEOChange("description", e.target.value)}
              rows={2}
            />
            <Input
              placeholder="Keywords (comma separated)"
              value={service.seo.keywords}
              onChange={(e) => handleSEOChange("keywords", e.target.value)}
            />
            <Separator />
            <Input
              placeholder="OG Title"
              value={service.seo.openGraph.title}
              onChange={(e) => handleOGChange("title", e.target.value)}
            />
            <Textarea
              placeholder="OG Description"
              value={service.seo.openGraph.description}
              onChange={(e) => handleOGChange("description", e.target.value)}
              rows={2}
            />
            <div>
              <label className="text-sm font-medium">OG Image</label>
              <Input type="file" accept="image/*" onChange={handleOGFile} />
              {service.seo.openGraph.currentImage && (
                <img
                  src={service.seo.openGraph.currentImage}
                  alt="OG Image"
                  className="h-20 my-2 rounded border"
                />
              )}
            </div>
            <Input
              placeholder="OG URL"
              value={service.seo.openGraph.url}
              onChange={(e) => handleOGChange("url", e.target.value)}
            />
          </CardContent>
        </Card>
      </div>
      {/* Subservices */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Subservices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {service.subservices.length === 0 && (
            <div className="text-muted-foreground text-sm">
              No subservices yet.
            </div>
          )}
          {service.subservices.map((sub, idx) => (
            <Card key={idx} className="bg-gray-50 border-2 border-dashed">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-semibold">
                    Subservice {idx + 1}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSub(idx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input
                    placeholder="Subservice Name"
                    value={sub.name}
                    onChange={(e) =>
                      handleSubChange(idx, "name", e.target.value)
                    }
                    required
                  />
                  <Input
                    placeholder="Slug"
                    value={sub.slug}
                    onChange={(e) =>
                      handleSubChange(idx, "slug", e.target.value)
                    }
                    required
                  />
                </div>
                <Textarea
                  placeholder="Short Description"
                  value={sub.description}
                  onChange={(e) =>
                    handleSubChange(idx, "description", e.target.value)
                  }
                  rows={2}
                />
                <Textarea
                  placeholder="Key Points (one per line)"
                  value={sub.keyPoints}
                  onChange={(e) =>
                    handleSubChange(idx, "keyPoints", e.target.value)
                  }
                  rows={3}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium">
                      Subservice Image
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSubFile(idx, e)}
                    />
                    {sub.currentImage && (
                      <img
                        src={sub.currentImage}
                        alt="Subservice"
                        className="h-20 my-2 rounded border"
                      />
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Image Alt Text
                    </label>
                    <Input
                      placeholder="Image Alt Text"
                      value={sub.imageAlt}
                      onChange={(e) =>
                        handleSubChange(idx, "imageAlt", e.target.value)
                      }
                    />
                  </div>
                </div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Full Details (rich text)
                </label>
                <RichTextEditor
                  content={sub.details}
                  onChange={(val) => handleSubChange(idx, "details", val)}
                />
              </CardContent>
            </Card>
          ))}
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={addSubservice}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Subservice
          </Button>
        </CardContent>
      </Card>
      {/* Industries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Industries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {service.industries.length === 0 && (
            <div className="text-muted-foreground text-sm">
              No industries yet.
            </div>
          )}
          {service.industries.map((ind, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <Input
                placeholder="Industry Name"
                value={ind.name}
                onChange={(e) =>
                  handleIndustryChange(idx, "name", e.target.value)
                }
                className="w-2/5"
              />
              <Input
                placeholder="Detail"
                value={ind.detail}
                onChange={(e) =>
                  handleIndustryChange(idx, "detail", e.target.value)
                }
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeIndustry(idx)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addIndustry}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Industry
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
