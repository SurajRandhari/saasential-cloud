import { notFound } from "next/navigation";

export default async function SubservicePage({ params }) {
  const { slug, "subservice-slug": subserviceSlug } = await params;
  console.log("DEBUG params:", slug, subserviceSlug);

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://your-domain.com"; // <= change this to your real domain in prod

  const resp = await fetch(`${baseUrl}/api/services/${slug}`, { cache: "no-store" });
  if (!resp.ok) return notFound();
  const service = await resp.json();

  const sub = (service.subservices || []).find(s => s.slug === subserviceSlug);
  if (!sub) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 mt-22">
      {/* Banner */}
      {sub.image?.secure_url && (
        <img
          src={sub.image.secure_url}
          alt={sub.image.alt ?? sub.name}
          width={sub.image.width}
          height={sub.image.height}
          className="rounded-xl shadow-lg w-full max-w-xl mx-auto mb-6 object-cover"
          style={{ maxHeight: 350 }}
        />
      )}
      <h1 className="text-4xl font-bold text-center mb-3">{sub.name}</h1>
      {/* Description */}
      <p className="text-lg text-muted-foreground mb-8 text-center">{sub.description}</p>
      {/* Details */}
      {sub.details && (
        <div
          className="prose prose-lg mx-auto mb-8"
          dangerouslySetInnerHTML={{ __html: sub.details }}
        />
      )}
      {/* Key Points */}
      {sub.keyPoints && sub.keyPoints.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Key Points</h2>
          <ul className="mb-10 space-y-2 text-base max-w-md mx-auto">
            {sub.keyPoints.map((bp, idx) => (
              <li key={idx} className="flex gap-2 items-start">
                <span className="text-blue-500 font-bold">•</span>
                <span>{bp.replace(/\r/g, "")}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Back */}
      <div className="mt-8 text-center">
        <a href={`/services/${slug}`} className="text-blue-600 underline text-sm">
          ← Back to {service.name}
        </a>
      </div>
    </main>
  );
}
