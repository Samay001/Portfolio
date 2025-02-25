"use client";
import React from "react";
import { NavbarDemo } from "@/components/navbar";
import { SpotlightNewDemo } from "@/components/spotlight";
import ProjectsSection from "@/app/projects/page";
import {StickyScrollRevealDemo} from "@/components/stickyScroll";
import {CardHoverEffectDemo} from "@/components/cards";
import {FloatingDockDemo} from "@/components/dock";
import FixedIcons from "@/components/fixedIcons";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col bg-black">
      <NavbarDemo />
      <SpotlightNewDemo />
      <StickyScrollRevealDemo />
      <ProjectsSection />
      <CardHoverEffectDemo />
      <FixedIcons />
      <FloatingDockDemo />
    </div>
  );
}
