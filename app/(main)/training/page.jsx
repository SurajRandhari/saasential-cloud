"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaChartBar, FaRegClock } from "react-icons/fa";
import Link from "next/link";
import { trainings } from "@/data/training/trainings";

// Industry filter options (with suboptions and counts)
const industriesOptions = [
  {
    label: "Banking & Insurance",
    count: 405,
    subs: [],
  },
  {
    label: "Hospital & Healthcare",
    count: 589,
    subs: [
      { label: "HIPAA-HITECH", count: 291 },
      { label: "General Healthcare", count: 338 },
      { label: "Healthcare IT & Data Security", count: 269 },
    ],
  },
  { label: "Law & Audits", count: 320, subs: [] },
  { label: "Human Resources", count: 440, subs: [] },
  { label: "Food & Dietary Supplements", count: 351, subs: [] },
  { label: "Life Sciences", count: 363, subs: [] },
  { label: "Multi Industry", count: 470, subs: [] },
  { label: "Manufacturing", count: 241, subs: [] },
];

// Training type and other filter options
const trainingTypes = [
  { label: "Live Webinar", count: 174 },
  { label: "Recorded Webinar", count: 91 },
  { label: "On-demand Webinar", count: 58 },
];

const levels = [
  { label: "Basic", count: 230 },
  { label: "Intermediate", count: 167 },
  { label: "Advanced", count: 81 },
  { label: "Basic / Intermediate", count: 295 },
];

// At the top (below durations, or instead):
const speakers = [
  {
    label: "David Sawyer",
    count: trainings.filter((t) => t.speaker === "David Sawyer").length,
  },
  {
    label: "Stacy Glass",
    count: trainings.filter((t) => t.speaker === "Stacy Glass").length,
  },
  {
    label: "Mike Thomas",
    count: trainings.filter((t) => t.speaker === "Mike Thomas").length,
  },
  {
    label: "Diane L. Dee",
    count: trainings.filter((t) => t.speaker === "Diane L. Dee").length,
  },
  {
    label: "Alan Murray",
    count: trainings.filter((t) => t.speaker === "Alan Murray").length,
  },
  {
    label: "Larry Johnson",
    count: trainings.filter((t) => t.speaker === "Larry Johnson").length,
  },
  {
    label: "Richard Erschik",
    count: trainings.filter((t) => t.speaker === "Richard Erschik").length,
  },
  {
    label: "Sean Stein Smith",
    count: trainings.filter((t) => t.speaker === "Sean Stein Smith").length,
  },
  {
    label: "Joe Keenan",
    count: trainings.filter((t) => t.speaker === "Joe Keenan").length,
  },
  {
    label: "Tom Fragale",
    count: trainings.filter((t) => t.speaker === "Tom Fragale").length,
  },
  {
    label: "Dr. Sarah Johnson",
    count: trainings.filter((t) => t.speaker === "Dr. Sarah Johnson").length,
  },
  {
    label: "Chef Robert Martinez",
    count: trainings.filter((t) => t.speaker === "Chef Robert Martinez").length,
  },
];

export default function TrainingPage() {
  const [industry, setIndustry] = useState([]);
  const [subIndustry, setSubIndustry] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedType, setType] = useState([]);
  const [selectedLevel, setLevel] = useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState([]);
  const [page, setPage] = useState(1);

  // Sidebar collapses
  const [showIndustries, setShowIndustries] = useState(true);
  const [showTrainingType, setShowTrainingType] = useState(true);
  const [showLevels, setShowLevels] = useState(true);
  const [showSpeaker, setShowSpeaker] = useState(true);
  // Track expanded industries
  const [openIndustrySubs, setOpenIndustrySubs] = useState({});

  function toggle(arr, setArr, label) {
    setArr(
      arr.includes(label) ? arr.filter((x) => x !== label) : [...arr, label]
    );
    setPage(1);
  }
  // Sub-dropdown open logic
  function handleParentClick(opt) {
    if (opt.subs.length > 0) {
      setOpenIndustrySubs((prev) => ({
        ...prev,
        [opt.label]: !prev[opt.label],
      }));
    }
  }
  function handleParentCheck(opt) {
    toggle(industry, setIndustry, opt.label);
    if (opt.subs.length > 0) {
      setOpenIndustrySubs((prev) => ({
        ...prev,
        [opt.label]: !prev[opt.label],
      }));
    }
  }

  // Filtering
  let filteredTrainings = trainings.filter((t) => {
    const matchIndustry =
      industry.length === 0 ? true : industry.includes(t.industry);
    const matchSubIndustry =
      subIndustry.length === 0
        ? true
        : t.subIndustry && subIndustry.includes(t.subIndustry);
    const matchKeyword =
      t.title.toLowerCase().includes(keyword.toLowerCase()) ||
      t.description.toLowerCase().includes(keyword.toLowerCase());
    const matchType =
      selectedType.length === 0 ? true : selectedType.includes(t.type);
    const matchLevel =
      selectedLevel.length === 0 ? true : selectedLevel.includes(t.level);
    const matchSpeaker =
      selectedSpeaker.length === 0 ? true : selectedSpeaker.includes(t.speaker);
    let matchDate = true;
    if (fromDate) matchDate = new Date(t.date) >= new Date(fromDate);
    if (toDate && matchDate) matchDate = new Date(t.date) <= new Date(toDate);
    return (
      matchIndustry &&
      matchSubIndustry &&
      matchKeyword &&
      matchType &&
      matchLevel &&
      matchSpeaker &&
      matchDate
    );
  });
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTrainings.length / itemsPerPage);
  filteredTrainings = filteredTrainings.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // --- Sidebar filter
  function SidebarFilter() {
    return (
      <div className="w-full ">
        {/* INDUSTRIES FILTER (auto dropdown on click/check) */}
        <div className="rounded-t-xl overflow-hidden mb-5 shadow">
          <button
            className="bg-[#023047] w-full px-5 py-2 flex items-center justify-between focus:outline-none"
            onClick={() => setShowIndustries(!showIndustries)}
          >
            <span className="text-white font-semibold text-lg">Industries</span>
          </button>
          {showIndustries && (
            <div className="bg-white p-3 max-h-78 overflow-y-auto">
              {industriesOptions.map((opt) => (
                <div key={opt.label}>
                  <div
                    className="flex items-center gap-2 py-2 text-base font-medium cursor-pointer select-none"
                    onClick={() => handleParentClick(opt)}
                  >
                    <input
                      type="checkbox"
                      checked={industry.includes(opt.label)}
                      onChange={() => handleParentCheck(opt)}
                      className="w-5 h-5"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>
                      {opt.label}
                      <span className="text-gray-500 font-normal text-base">
                        {" "}
                        ({opt.count})
                      </span>
                    </span>
                  </div>
                  {/* Suboptions dropdown auto-opens */}
                  {opt.subs.length > 0 && openIndustrySubs[opt.label] && (
                    <div className="ml-7 pl-2 border-l border-gray-200 max-h-78 overflow-y-auto">
                      {opt.subs.map((sub) => (
                        <label
                          key={sub.label}
                          className="flex items-center gap-2 py-1 text-[15px] text-gray-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={subIndustry.includes(sub.label)}
                            onChange={() =>
                              toggle(subIndustry, setSubIndustry, sub.label)
                            }
                            className="w-4 h-4"
                          />
                          <span>
                            {sub.label}
                            <span className="text-gray-400 font-normal">
                              ({sub.count})
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* TRAINING TYPE */}
        <div className="rounded-t-xl overflow-hidden mb-5 shadow">
          <button
            className="bg-[#023047] w-full px-5 py-2 flex items-center justify-between focus:outline-none"
            onClick={() => setShowTrainingType(!showTrainingType)}
          >
            <span className="text-white font-semibold text-lg">
              Training Type
            </span>
          </button>
          {showTrainingType && (
            <div className="bg-white p-3 max-h-78 overflow-y-auto">
              {trainingTypes.map((opt) => (
                <label
                  key={opt.label}
                  className="flex items-center gap-2 py-2 text-base font-medium"
                >
                  <input
                    type="checkbox"
                    checked={selectedType.includes(opt.label)}
                    onChange={() => toggle(selectedType, setType, opt.label)}
                    className="w-5 h-5"
                  />
                  <span>
                    {opt.label}{" "}
                    <span className="text-gray-500 font-normal text-base">
                      ({opt.count})
                    </span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
        {/* LEVELS FILTER */}
        <div className="rounded-t-xl overflow-hidden mb-5 shadow">
          <button
            className="bg-[#023047] w-full px-5 py-2 flex items-center justify-between focus:outline-none"
            onClick={() => setShowLevels(!showLevels)}
          >
            <span className="text-white font-semibold text-lg">Levels</span>
          </button>
          {showLevels && (
            <div className="bg-white p-3 max-h-78 overflow-y-auto">
              {levels.map((opt) => (
                <label
                  key={opt.label}
                  className="flex items-center gap-2 py-2 text-base font-medium"
                >
                  <input
                    type="checkbox"
                    checked={selectedLevel.includes(opt.label)}
                    onChange={() => toggle(selectedLevel, setLevel, opt.label)}
                    className="w-5 h-5"
                  />
                  <span>
                    {opt.label}{" "}
                    <span className="text-gray-500 font-normal text-base">
                      ({opt.count})
                    </span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
        {/* SPEAKER FILTER */}
        <div className="rounded-t-xl overflow-hidden mb-5 shadow">
          <button
            className="bg-[#023047] w-full px-5 py-2 flex items-center justify-between focus:outline-none"
            onClick={() => setShowSpeaker(!showSpeaker)}
          >
            <span className="text-white font-semibold text-lg">Speaker</span>
          </button>
          {showSpeaker && (
            <div className="bg-white p-3 max-h-48 overflow-y-auto">
              {speakers.map((opt) => (
                <label
                  key={opt.label}
                  className="flex items-center gap-2 py-2 text-base font-medium"
                >
                  <input
                    type="checkbox"
                    checked={selectedSpeaker.includes(opt.label)}
                    onChange={() =>
                      toggle(selectedSpeaker, setSelectedSpeaker, opt.label)
                    }
                    className="w-5 h-5"
                  />
                  <span>
                    {opt.label}{" "}
                    <span className="text-gray-500 font-normal text-base">
                      ({opt.count})
                    </span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
        <Button
          variant="secondary"
          className="my-4 w-full"
          onClick={() => {
            setIndustry([]);
            setSubIndustry([]);
            setType([]);
            setLevel([]);
            setSelectedSpeaker([]);
            setKeyword("");
            setFromDate("");
            setToDate("");
            setPage(1);
          }}
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  // ---- Main Page Render ----
  return (
    <div className="min-h-screen bg-white w-full my-25">
      <h1 className="text-3xl font-bold text-teal-800 mt-6 mb-4 text-center">
        Search Trainings
      </h1>
      {/* Search Bar */}
      <div className="max-w-[1600px] w-full mx-auto pt-4 px-4">
        <div className="bg-white rounded-xl shadow-md py-6 px-4 flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0 border border-gray-300 mb-8">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Industry
            </label>
            <select
              value={industry[0] || ""}
              onChange={(e) =>
                setIndustry(e.target.value ? [e.target.value] : [])
              }
              className="w-full border-b border-[#023047] bg-white py-2 pl-0 pr-3 focus:outline-none text-gray-800 font-semibold text-base"
            >
              <option value="">All</option>
              {industriesOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              &nbsp;
            </label>
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full border-b border-[#023047] py-2 pr-3 bg-white font-normal text-base focus:outline-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border-b border-[#023047] py-2 pr-3 bg-white focus:outline-none"
            />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border-b border-[#023047] py-2 pr-3 bg-white focus:outline-none"
            />
          </div>
          <div className="flex items-end pb-1">
            <Button className="bg-gradient-to-r from-white to-[#FCA211] hover:from-[#FCA211] hover:to-white text-[#023047] font-bold px-7 py-2 rounded flex items-center text-lg space-x-2 shadow-md  transition-all">
              <FaSearch />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Main layout */}
      <div className="max-w-[1600px] w-full mx-auto flex px-2 gap-8">
        {/* Sidebar */}
        <aside className="w-[320px] sticky top-8 h-fit self-start bg-white border-2 border-gray-300 rounded-xl shadow-lg py-6 px-4 flex flex-col min-h-[600px]">
          <SidebarFilter />
        </aside>
        {/* Trainings list: one per row */}
        <main className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="text-lg font-semibold">
              {filteredTrainings.length} Trainings
            </div>
            {filteredTrainings.length !== trainings.length && (
              <div className="text-sm text-gray-500 mt-2 md:mt-0">
                {filteredTrainings.length} shown by filter
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {filteredTrainings.length === 0 ? (
              <div className="text-gray-500 text-center py-10">
                No trainings found matching your criteria.
              </div>
            ) : (
              filteredTrainings.map((t) => (
                <Card
                  key={t.id}
                  className="flex flex-row w-full min-h-[180px] shadow hover:shadow-lg transition cursor-pointer"
                >
                  {/* IMAGE SECTION */}
                  <div className="relative w-40 h-auto flex-shrink-0 rounded-l-xl overflow-hidden bg-gray-200">
                    <img
                      src="https://images.pexels.com/photos/3183184/pexels-photo-3183184.jpeg"
                      alt={t.title}
                      className="object-cover w-full h-full min-h-[180px]"
                    />
                    {/* TAG BADGE */}
                    <span className="absolute top-3 left-3 bg-[#023047] text-white px-3 py-1 rounded-md text-xs font-semibold shadow">
                      {t.type}
                    </span>
                  </div>
                  {/* CONTENT SECTION */}
                  <div className="flex-1 flex flex-col justify-between p-6 bg-white rounded-r-xl">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-[#023047]">
                          {t.title}
                        </h3>
                        <span className="text-xs text-gray-400">
                          {new Date(t.date).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-sm text-gray-800 mb-3">
                        {t.description}
                      </p>
                      {/* META */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-xs text-gray-600 items-center">
                        {/* SPEAKER PROFILE FIRST */}
                        <span className="flex items-center gap-2">
                          <img
                            src="https://images.pexels.com/photos/34433260/pexels-photo-34433260.jpeg"
                            alt={t.speaker}
                            className="w-8 h-8 rounded-full object-cover border-2 border-[#023047]"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/40";
                            }}
                          />
                          <Link
                            href={`/speakers/${encodeURIComponent(
                              t.speaker.replace(/ /g, "-").toLowerCase()
                            )}`}
                            className="font-semibold text-[#023047] text-sm hover:underline"
                            prefetch={false}
                          >
                            {t.speaker}
                          </Link>
                        </span>
                        {/* Meta fields */}
                        <span className="flex items-center gap-1">
                          <FaChartBar className="text-[#023047]" />
                          <b>Level:</b>&nbsp;{t.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaRegClock className="text-[#023047]" />
                          <b>Duration:</b>&nbsp;{t.duration}
                        </span>
                        <span>
                          <b>Industry:</b>&nbsp;{t.industry}
                        </span>
                        {t.subIndustry && (
                          <span>
                            <b>Sub Industry:</b>&nbsp;{t.subIndustry}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <Button
                variant="secondary"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "default" : "outline"}
                  onClick={() => setPage(i + 1)}
                  className="px-3"
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="secondary"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
