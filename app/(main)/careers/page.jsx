"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import { GradientButton } from "@/components/common/my-button/GradientButton";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { TextGifHeadingOne } from "@/components/textGif/TextGifDemo";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }, // animate one by one
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Mock Job Data
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    experience: "2–4 years",
    location: "Bangalore, India",
    summary:
      "Responsible for building user-friendly web applications using React and Next.js.",
    requirements: [
      "Proficiency in JavaScript, React, Next.js, and TailwindCSS",
      "Experience with REST APIs",
      "Good understanding of responsive design",
    ],
    responsibilities: [
      "Develop and maintain UI components",
      "Work with designers and backend developers",
      "Ensure performance and cross-browser compatibility",
    ],
  },
  {
    id: 2,
    title: "Backend Developer",
    experience: "3–5 years",
    location: "Hyderabad, India",
    summary: "Work on scalable backend services using Node.js and databases.",
    requirements: [
      "Strong knowledge of Node.js, Express, or Nest.js",
      "Experience with SQL and NoSQL databases",
      "Understanding of microservices architecture",
    ],
    responsibilities: [
      "Design APIs and backend logic",
      "Collaborate with frontend developers",
      "Optimize backend performance",
    ],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    experience: "4–6 years",
    location: "Remote",
    summary:
      "End-to-end development of web applications using modern technologies.",
    requirements: [
      "Expertise in React, Node.js, and databases",
      "Familiarity with cloud services (AWS/GCP/Azure)",
      "Knowledge of CI/CD pipelines",
    ],
    responsibilities: [
      "Build both frontend and backend features",
      "Deploy and maintain applications",
      "Ensure security best practices",
    ],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    experience: "2–3 years",
    location: "Pune, India",
    summary:
      "Design intuitive and visually appealing web and mobile interfaces.",
    requirements: [
      "Proficiency in Figma, Adobe XD, or Sketch",
      "Understanding of design systems",
      "Basic knowledge of frontend tech",
    ],
    responsibilities: [
      "Create wireframes and prototypes",
      "Collaborate with developers",
      "Conduct user research and testing",
    ],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    experience: "3–5 years",
    location: "Chennai, India",
    summary:
      "Responsible for infrastructure, CI/CD pipelines, and deployment automation.",
    requirements: [
      "Hands-on experience with Docker & Kubernetes",
      "Knowledge of Jenkins/GitHub Actions",
      "Experience with monitoring tools",
    ],
    responsibilities: [
      "Manage CI/CD pipelines",
      "Ensure high availability and scalability",
      "Monitor infrastructure and logs",
    ],
  },
  {
    id: 6,
    title: "QA Automation Engineer",
    experience: "2–4 years",
    location: "Gurgaon, India",
    summary: "Responsible for automated testing of web and mobile apps.",
    requirements: [
      "Experience with Selenium, Cypress, or Playwright",
      "Strong knowledge of QA methodologies",
      "Good understanding of APIs",
    ],
    responsibilities: [
      "Write automated test scripts",
      "Perform regression testing",
      "Collaborate with developers for bug fixes",
    ],
  },
];
const MotionAccordionItem = motion(AccordionItem);

export default function Careers() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Banner */}
      <div className="relative w-full h-[350px] md:h-[420px] overflow-hidden flex items-center justify-center">
           <video
             className="absolute inset-0 w-full h-full object-cover opacity-50" // ✅ opacity added
             src="/images/career/career_bnr.webm"
             autoPlay
             loop
             muted
             playsInline
           />
           <div className="mx-auto px-4 py-16 text-center">
               <TextGifHeadingOne fontSize="6rem">Career</TextGifHeadingOne>
             </div>
         </div>

      {/* Job Openings Accordion */}
      <section className="w-full max-w-4xl mx-auto py-10">
        <h2 className="text-3xl font-bold mb-6">Job Openings</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <Accordion type="single" collapsible className="w-full border-b border-gray-200 rounded-lg divide-y divide-gray-300">
            {jobs.map((job) => (
              <motion.div key={job.id} variants={itemVariants}>

                  <AccordionItem  key={job.id}  value={`job-${job.id}`}>
                  <AccordionTrigger className="text-4xl font-semibold">
                    {job.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between items-center bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
                      <p className="font-semibold ">
                        <strong>Experience:</strong> {job.experience}
                      </p>
                      <p className="font-semibold ">
                        <strong>Location:</strong> {job.location}
                      </p>
                    </div>

                    <p className="mt-2">
                      <strong>Summary:</strong> {job.summary}
                    </p>

                    <div className="mt-2">
                      <strong>Requirements:</strong>
                      <ul className="list-disc list-inside ml-4">
                        {job.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-2">
                      <strong>Responsibilities:</strong>
                      <ul className="list-disc list-inside ml-4">
                        {job.responsibilities.map((res, idx) => (
                          <li key={idx}>{res}</li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Apply Button + Dialog (unchanged except positioning) */}
        <div className="mt-8 flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
               <InteractiveHoverButton>Apply Now</InteractiveHoverButton>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Apply for a Job</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div>
                  <Label>Job Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job role" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.title}>
                          {job.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="resume">Resume</Label>
                  <Input id="resume" type="file" accept=".pdf,.doc,.docx" />
                </div>
                <div>
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <textarea
                    id="coverLetter"
                    rows={4}
                    className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your cover letter here..."
                  />
                </div>
                {/* <Button type="submit" className="w-full">
                  Submit Application
                </Button> */}
                <GradientButton className="w-fit">
                  Submit Application
                </GradientButton>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}