"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import { RichTextEditor } from "@/components/rich-text-editor";

const BLANK_SUB = {
  name: "",
  slug: "",
  description: "",
  keyPoints: "",
  image: null,
  imageAlt: "",
  details: "",
};

export default function NewServicePage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [subSlugEdited, setSubSlugEdited] = useState({});

  const [service, setService] = useState({
    name: "",
    slug: "",
    // bannerImage: null,
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

  // UI value helpers for rich text
  const handleChange = (field, value) =>
    setService((prev) => ({ ...prev, [field]: value }));

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

  const removeIndustry = (idx) => {
    const industries = service.industries.filter((_, i) => i !== idx);
    setService((prev) => ({ ...prev, industries }));
  };

  const addSubservice = () =>
    setService((prev) => ({
      ...prev,
      subservices: [...prev.subservices, { ...BLANK_SUB }],
    }));



  const handleSubChange = (idx, field, value) => {
    const subservices = [...service.subservices];
    subservices[idx][field] = value;

    // On name change, auto-update slug unless slug was manually changed
    if (field === "name" && !subSlugEdited[idx]) {
      subservices[idx].slug = slugify(value);
    }

    setService((prev) => ({ ...prev, subservices }));

    // If slug edited, mark manual edit for this subservice
    if (field === "slug") {
      setSubSlugEdited((prev) => ({ ...prev, [idx]: true }));
    }
  };

  const removeSub = (idx) => {
    setService((prev) => ({
      ...prev,
      subservices: prev.subservices.filter((_, i) => i !== idx),
    }));
  };

  // Handle file inputs
  // const handleFileInput = (e, field) =>
  //   setService((prev) => ({ ...prev, [field]: e.target.files[0] || null }));

  const handleOGFileInput = (e) =>
    setService((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        openGraph: { ...prev.seo.openGraph, image: e.target.files[0] || null },
      },
    }));

  const handleSubFileInput = (idx, e) => {
    const subservices = [...service.subservices];
    subservices[idx].image = e.target.files[0] || null;
    setService((prev) => ({ ...prev, subservices }));
  };

  // Submit as FormData, including all files
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const fd = new FormData();
      fd.append("name", service.name);
      fd.append("slug", service.slug);
      // Only append if the bannerImage is a File:
      // if (service.bannerImage instanceof File) {
      //   fd.append("bannerImage", service.bannerImage);
      // }

      fd.append("title", service.title);
      fd.append("subtitle", service.subtitle);

      fd.append("seoTitle", service.seo.title);
      fd.append("seoDescription", service.seo.description);
      fd.append("seoKeywords", service.seo.keywords);
      fd.append("ogTitle", service.seo.openGraph.title);
      fd.append("ogDescription", service.seo.openGraph.description);
      // Only append if ogImage is a File:
      if (service.seo.openGraph.image instanceof File) {
        fd.append("ogImage", service.seo.openGraph.image);
      }
      fd.append("ogUrl", service.seo.openGraph.url);

      // Industries
      service.industries.forEach((ind, idx) => {
        fd.append(`industries[${idx}][name]`, ind.name);
        fd.append(`industries[${idx}][detail]`, ind.detail);
      });

      // Subservices
      service.subservices.forEach((sub, idx) => {
        fd.append(`subservices[${idx}][name]`, sub.name);
        fd.append(`subservices[${idx}][slug]`, sub.slug);
        fd.append(`subservices[${idx}][description]`, sub.description);
        fd.append(`subservices[${idx}][keyPoints]`, sub.keyPoints);
        // Only append if image is File:
        if (sub.image instanceof File) {
          fd.append(`subservices[${idx}][image]`, sub.image);
        }
        fd.append(`subservices[${idx}][imageAlt]`, sub.imageAlt);
        fd.append(`subservices[${idx}][details]`, sub.details);
      });

      const res = await fetch("/api/services", {
        method: "POST",
        body: fd,
      });

      // Always parse text so you can inspect it
      const resText = await res.text();
      console.log("Service create response:", res.status, resText);

      if (!res.ok) {
        toast.error("Failed to create service");
        setPending(false);
        return;
      }

      toast.success("Service created!");
      router.push("/admin/services");

      // if (!res.ok) throw new Error(await res.text());
      // toast.success("Service created!");
      // router.push("/admin/services");
    } catch (err) {
      toast.error("Failed to create service");
      setPending(false);
    }
    // finally {
    //   setPending(false);
    // }
  };

  //automate slug from name if not manually edited
  function slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes
  }

  

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={pending}
          className="ml-auto min-w-[130px]"
        >
          {pending ? "Saving..." : "Create Service"}
        </Button>
      </div>

      {/* Two columns: Service Overview & SEO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Service Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Service Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Service Name"
              value={service.name}
              onChange={(e) => {
                const name = e.target.value;
                handleChange("name", name);
                if (!slugManuallyEdited) {
                  handleChange("slug", slugify(name));
                }
              }}
              name="name"
              required
            />
            <Input
              placeholder="Slug"
              value={service.slug}
              onChange={(e) => {
                handleChange("slug", e.target.value);
                setSlugManuallyEdited(true);
              }}
              name="slug"
              required
            />
            {/* <div>
              <label className="text-sm font-medium">Banner Image</label>
              <Input
                type="file"
                name="bannerImage"
                accept="image/*"
                onChange={(e) => handleFileInput(e, "bannerImage")}
                required
              />
            </div> */}
            <Input
              placeholder="Page Title"
              value={service.title}
              onChange={(e) => handleChange("title", e.target.value)}
              name="title"
            />
            <Textarea
              placeholder="Subtitle"
              value={service.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              name="subtitle"
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
              onChange={(e) =>
                setService((prev) => ({
                  ...prev,
                  seo: { ...prev.seo, title: e.target.value },
                }))
              }
            />
            <Textarea
              placeholder="SEO Description"
              value={service.seo.description}
              onChange={(e) =>
                setService((prev) => ({
                  ...prev,
                  seo: { ...prev.seo, description: e.target.value },
                }))
              }
              rows={2}
            />
            <Input
              placeholder="Keywords (comma separated)"
              value={service.seo.keywords}
              onChange={(e) =>
                setService((prev) => ({
                  ...prev,
                  seo: { ...prev.seo, keywords: e.target.value },
                }))
              }
            />
            <Separator />
            <Input
              placeholder="OG Title"
              value={service.seo.openGraph.title}
              onChange={(e) =>
                setService((prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    openGraph: { ...prev.seo.openGraph, title: e.target.value },
                  },
                }))
              }
            />
            <Textarea
              placeholder="OG Description"
              value={service.seo.openGraph.description}
              onChange={(e) =>
                setService((prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    openGraph: {
                      ...prev.seo.openGraph,
                      description: e.target.value,
                    },
                  },
                }))
              }
              rows={2}
            />
            <div>
              <label className="text-sm font-medium">OG Image</label>
              <Input
                type="file"
                name="ogImage"
                accept="image/*"
                onChange={handleOGFileInput}
              />
            </div>
            <Input
              placeholder="OG URL"
              value={service.seo.openGraph.url}
              onChange={(e) =>
                setService((prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    openGraph: { ...prev.seo.openGraph, url: e.target.value },
                  },
                }))
              }
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
                      onChange={(e) => handleSubFileInput(idx, e)}
                    />
                  </div>
                  <div>
                    <div className="h-6"></div>
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
