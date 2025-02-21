"use client";
import React from "react";
import Image from "next/image";
import { NavbarDemo } from "@/components/navbar";
import { FloatingDockDemo } from "@/components/dock";
import { SpotlightNewDemo } from "@/components/spotlight";
// import {AppleCardsCarouselDemo} from "@/components/card";
import {ProjectsSection} from "@/app/projects/page";
import {InfiniteMovingCardsDemo} from "@/components/movingCards";
import {StickyScrollRevealDemo} from "@/components/stickyScroll";
export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col bg-black">
      <NavbarDemo />
      <SpotlightNewDemo />
      {/* <AppleCardsCarouselDemo /> */}
      <StickyScrollRevealDemo />
      <ProjectsSection />
      <InfiniteMovingCardsDemo/>
      <FloatingDockDemo />
    </div>
  );
}
