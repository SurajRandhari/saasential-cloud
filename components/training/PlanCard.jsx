import Link from "next/link";

export default function PlanCard({ title, subtitle, speaker, time, price }) {
  return (
    <div className="bg-white border-t px-4 py-2 flex flex-col items-start justify-between gap-2">
      <div className="font-semibold text-[#0B8AE5]">{title}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>

      <div className="flex items-center space-x-2">
        <img src="/avatar.webp" alt={speaker} className="w-8 h-8 rounded-full" />

        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>by {speaker}</span>
          <span className="text-gray-300">|</span>
          <span>time: {time}</span>
          <span className="text-gray-300">|</span>
          <span className="text-black">Price: {price}</span>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-blue-500 hover:underline">View Details</Link>
        </div>
      </div>
    </div>
  );
}
