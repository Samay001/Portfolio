"use client";
import React from "react";
import { NavbarDemo } from "@/components/navbar";
import { SpotlightNewDemo } from "@/components/spotlight";
import ProjectsSection from "@/components/projects";
import {StickyScrollRevealDemo} from "@/components/stickyScroll";
import {FloatingDockDemo} from "@/components/dock";
import FixedIcons from "@/components/fixedIcons";
import Skills from "@/components/logoCards";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col bg-black">
      <NavbarDemo />
      <SpotlightNewDemo />
      <StickyScrollRevealDemo />
      <ProjectsSection />
      <Skills />
      <FixedIcons />
      <FloatingDockDemo />
    </div>
  );
}
