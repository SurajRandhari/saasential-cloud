import { Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GradientButton } from "../common/my-button/GradientButton";

export default function SidebarFilters() {
  return (
    <aside className="w-72 rounded shadow-xl bg-white">
      {/* Header with Filter Icon */}
      <div className="bg-blue-500 text-white px-4 py-3 flex items-center gap-2">
        <Filter className="w-5 h-5" />
        <h2 className="font-semibold text-lg">Filters</h2>
      </div>

      {/* Filter Form */}
      <div className="px-4 py-4 space-y-4">
        {/* Search Input */}
        <div className="space-y-1">
          <Label htmlFor="search">Search By</Label>
          <Input id="search" placeholder="Enter keyword..." />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option>All</option>
          </select>
        </div>

        {/* Speakers */}
        <div className="space-y-1">
          <Label htmlFor="speakers">Speakers</Label>
          <select
            id="speakers"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option>All</option>
          </select>
        </div>

        {/* Month */}
        <div className="space-y-1">
          <Label htmlFor="month">Month</Label>
          <select
            id="month"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option>All</option>
          </select>
        </div>

        {/* Search Button */}
        <GradientButton variant="gradient" className="w-full px-4 py-5 mt-4 text-white text-base font-normal">
          Search
        </GradientButton>

        {/* Filter Summary */}
        <div className="mt-6 text-sm text-gray-600">
          <p>Topic: Not Specified</p>
          <p>Category: All</p>
          <p>Speaker: All</p>
          <p>Month: Any</p>
        </div>
      </div>
    </aside>
  );
}
