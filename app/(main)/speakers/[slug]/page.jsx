"use client";
import React from "react";
import { useParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { FaBriefcase, FaLayerGroup, FaRegCalendarAlt } from "react-icons/fa";
import { trainings } from "@/data/training/trainings";
import Link from "next/link";

// Import your master trainings array here!
// import { trainings } from "./../../training/page.jsx";

export default function SpeakerProfilePage() {
  const params = useParams();
  const slug = params?.slug;
  const speakerName = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  // Mock profile info: replace/extend this with your real speaker profile data!
  const profile = {
    name: speakerName,
    img: "/images/speakers/default.jpg", // Use real path or a generic placeholder
    areaOfExpertise: "Lending, Credit Analysis",
    experience: 35,
    industry: "Banking & Insurance",
    bio: `David Sawyer’s experience in banking began in 1981 in the area of credit administration with Central Bank of the South. ... [Add the rest of the bio about Mr. David Sawyer here, as in your screenshot and the URL content.]`,
    highlights: [
      "Extensive knowledge and experience in lending, credit analysis and problem loan identification/workout.",
      "Expert in teaching and training bankers, with certifications in the banking area.",
    ],
  };

  const speakerTrainings = trainings.filter(
    (t) => t.speaker.replace(/ /g, "-").toLowerCase() === slug
  );

  return (
    <div className="max-w-6xl mx-auto my-30 ">
      {/* TOP PROFILE */}
      <div className="bg-white p-7 rounded-xl shadow-md flex flex-col gap-5">
        <div className="mb-2 text-2xl font-bold text-teal-800">
          {profile.name ? `Mr. ${profile.name}` : ""}
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <img
            src={profile.img}
            alt={profile.name}
            className="w-36 h-36 rounded shadow border object-cover"
            style={{ objectPosition: "top" }}
          />
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-1 text-md">
              <span>
                <b>Area Of Expertise</b>{" "}
                <span className="font-normal">: {profile.areaOfExpertise}</span>
              </span>
              <span className="mx-4 text-gray-400 hidden md:inline">|</span>
              <span>
                <b>{profile.experience} Years Of Experience</b>
              </span>
              <span className="mx-4 text-gray-400 hidden md:inline">|</span>
              <span>
                <b>Training Industry</b>{" "}
                <span className="font-normal">: {profile.industry}</span>
              </span>
            </div>
            <div className="mt-4 text-gray-700">{profile.bio}</div>
          </div>
        </div>
      </div>

      {/* TRAINING LIST */}
      <div className="mt-10">
        <div className="text-lg font-bold text-teal-700 mb-2">
          {speakerTrainings.length} results{" "}
          <span className="font-normal text-black">found</span>
        </div>
        <div className="flex flex-col gap-6">
          {speakerTrainings.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-lg p-4 flex md:flex-row gap-4 shadow"
            >
              <div className="flex-shrink-0">
                <img
                  src="https://images.pexels.com/photos/3183184/pexels-photo-3183184.jpeg"
                  alt={t.title}
                  className="w-32 h-24 object-cover rounded"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-teal-700 text-white rounded px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {t.type}
                  </div>
                  <Link
                    href={`/training/${t.type
                      .replace(/ /g, "")
                      .toLowerCase()}/${t.id}/${t.title
                      .replace(/ /g, "-")
                      .toLowerCase()}`}
                    className="text-teal-700 font-semibold hover:underline cursor-pointer"
                  >
                    {t.title}
                  </Link>
                </div>

                <div className="text-sm text-gray-800 mb-2 break-words">
                  {t.description}
                </div>
                <div className="flex flex-wrap items-center gap-x-5 text-xs text-gray-600">
                  <span>
                    <FaLayerGroup className="inline mr-1" /> {t.level}
                  </span>
                  <span>
                    <FaRegCalendarAlt className="inline mr-1" /> {t.duration}
                  </span>
                  <span>
                    <FaBriefcase className="inline mr-1" /> {t.industry}
                    {t.subIndustry ? ` > ${t.subIndustry}` : ""}
                  </span>
                  <span className="text-gray-400">
                    {new Date(t.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM (You can add more profile sections, working hours, contact, or faculty join boxes as you wish) */}
    </div>
  );
}
