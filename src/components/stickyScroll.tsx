"use client";
import React, { useState } from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Experience",
    subHeading: "EDMO — Junior Software Engineer",
    timeFrame: "Nov 2025 - Present · Noida, India (Hybrid)",
    description:
      "Collaborated and build an AI-powered interviewing application, winning iSchoolConnect's hackathon (1st place, $50K prize) using Next.js, Nest.js, MongoDB, OpenAI GPT-4o-mini, and Vapi.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white bg-gradient-to-br from-purple-700 to-indigo-900">
        <span className="text-5xl font-extrabold tracking-widest">EDMO</span>
      </div>
    ),
  },
  {
    // title: "Experience",
    subHeading: "SarvM.AI — Backend Intern",
    timeFrame: "Mar 2025 - May 2025 · Remote (Part-time)",
    description:
      "Designed and implemented a cron scheduler to dynamically update retailer shop ratings by calculating the average from master rating, ensuring real-time accuracy and automation in the rating system. Developed and optimized a scalable API for updating user subscription details in Elasticsearch, enhancing data consistency, search efficiency, and system performance. Created a script to clean and validate shop data in the database by verifying QR scanner entries and filtering based on valid phone numbers and other criteria.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white bg-gradient-to-br from-emerald-600 to-teal-900">
        <span className="text-5xl font-extrabold tracking-widest">SarvM.AI</span>
      </div>
    ),
  },
  {
    title: "Hackathons",
    subHeading: "The Art of Building Under Pressure",
    // timeFrame: "Jul 2024 - Oct 2024",
    description:
      " Qualified for the final rounds of multiple hackathons, building innovative solutions under tight deadlines and high-pressure environments.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/hackathon.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Education",
    subHeading: "Chandigarh University",
    timeFrame: "Aug 2021 - June 2025",
    description:
      "Pursuing a Bachelor of Engineering, set to graduate in May 2025. Gained strong technical skills through coursework and hands-on projects, focusing on full-stack development, cloud computing, and AI.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/campus.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Linux & Open Source",
    subHeading: "Never run out of ideas",
    // timeFrame: "Jan 2025 - Apr 2025",
    description:
      " Passionate about Linux and open-source technologies, always exploring new tools, optimizations, and ways to enhance development workflows.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/linux.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  const [activeBgColor, setActiveBgColor] = useState("transparent");

  return (
    <div
      id="about-section"
      className="min-h-screen"
      style={{ backgroundColor: activeBgColor }}>
      <div className="w-full mx-auto mb-10 mt-8">
        <h1 className="text-4xl md:text-6xl sm:text-2xl font-bold text-white text-center">About Me</h1>
      </div>
      <StickyScroll content={content} onActiveColorChange={setActiveBgColor} />
    </div>
  );
}
