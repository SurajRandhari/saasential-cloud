"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, Users, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "@/components/ui/expandable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import webinarsData from "@/data/webinar.json";
import { TextGifHeadingOne } from "../textGif/TextGifDemo";

const ITEMS_PER_PAGE = 12; // 3 per row × 4 rows

export default function Webinars() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(webinarsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = webinarsData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="font-['Oxanium']">
      {/* Banner Section */}
      <div className="relative w-full h-[350px] md:h-[420px] overflow-hidden flex items-center justify-center">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-20" // ✅ opacity added
          src="/videos/webinar.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Webinars Cards */}
      <div className="relative w-full  ">
        <div className="mx-auto px-4 py-16 text-center">
          <TextGifHeadingOne fontSize="6rem">Webinars</TextGifHeadingOne>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
          {paginatedData.map((webinar) => (
             <div key={webinar.id} className="p-4">
            <Expandable
              key={webinar.id}
              expandDirection="both"
              expandBehavior="replace"
              initialDelay={0.1}
            >
              {({ isExpanded }) => (
                <ExpandableTrigger>
                  <ExpandableCard
                    className="w-full relative"
                    collapsedSize={{ width: "100%", height: "100%" }}
                    expandedSize={{ width: "100%", height: "100%" }}
                    hoverToExpand={false}
                  >
                    <ExpandableCardHeader>
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {webinar.badge}
                        </Badge>
                        <h3 className="font-semibold text-xl">
                          {webinar.title}
                        </h3>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                            >
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to Calendar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </ExpandableCardHeader>

                    <ExpandableCardContent>
                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-1" /> {webinar.time}
                        </div>
                        <ExpandableContent preset="fade">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-1" />{" "}
                            {webinar.location}
                          </div>
                        </ExpandableContent>
                      </div>

                      <ExpandableContent
                        preset="slide-up"
                        stagger
                        staggerChildren={0.1}
                      >
                        <p className="text-sm mb-4">{webinar.desc}</p>
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-2 flex items-center">
                            <Users className="h-4 w-4 mr-2" /> Attendees
                          </h4>
                          <div className="flex -space-x-2">
                            {webinar.attendees.map((name, i) => (
                              <Avatar key={i} className="border-2 border-white">
                                <AvatarImage
                                  src={`/placeholder.svg?text=${name[0]}`}
                                  alt={name}
                                />
                                <AvatarFallback>{name[0]}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          <Video className="h-4 w-4 mr-2" /> Join Webinar
                        </Button>
                      </ExpandableContent>
                    </ExpandableCardContent>

                    <ExpandableContent preset="slide-up">
                      <ExpandableCardFooter>
                        <span className="text-sm">Next: {webinar.date}</span>
                      </ExpandableCardFooter>
                    </ExpandableContent>
                  </ExpandableCard>
                </ExpandableTrigger>
              )}
            </Expandable>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center my-20 gap-4">
          <Button
            onClick={prevPage}
            disabled={currentPage === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
