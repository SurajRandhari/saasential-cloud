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
import { TextGifHeadingOne } from "@/components/textGif/TextGifDemo";

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

export default function Careers() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Banner */}
      <section className="banner w-full h-[350px] bg-blue-400 flex items-center justify-center">
         <div className="mx-auto px-4 py-16 text-center">
          <TextGifHeadingOne fontSize="6rem">Blogs</TextGifHeadingOne>
        </div>
      </section>

      {/* Job Openings Accordion */}
      <section className="w-full max-w-4xl mx-auto py-20">
        <Accordion type="single" collapsible className="w-full">
          {jobs.map((job) => (
            <AccordionItem key={job.id} value={`job-${job.id}`}>
              <AccordionTrigger className="text-4xl font-semibold">
                {job.title}
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  <strong>Experience:</strong> {job.experience}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
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
          ))}
        </Accordion>

        {/* Apply Button + Dialog */}
        <div className="mt-8 flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-6 py-2">Apply Now</Button>
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
                {/* New Cover Letter Field */}
                <div>
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <textarea
                    id="coverLetter"
                    rows={4}
                    className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your cover letter here..."
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}