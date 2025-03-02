"use client";
import React, { useState } from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Experience",
    subHeading: "Boost Star Experts",
    timeFrame: "Jun 2024 - Aug 2024",
    description:
      "Recognized as a top-performing intern at Boost Star Expert, where I contributed to web development and SEO optimization, improving website performance and user engagement.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="data:image/jpeg;base64,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"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Hackathon",
    subHeading: "Stay updated instantly",
    timeFrame: "Jul 2024 - Oct 2024",
    description:
      " Qualified for the final rounds of multiple hackathons, building innovative solutions under tight deadlines and high-pressure environments.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://media.licdn.com/dms/image/v2/D5622AQFmJAocPzt5vg/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1679739389439?e=1743033600&v=beta&t=9leYaFAr0W-tJcp9QyVaMdU8dMqce32TpwBsxB8hjiM"
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
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates.",
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
    timeFrame: "Jan 2025 - Apr 2025",
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
