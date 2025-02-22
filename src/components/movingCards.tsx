"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="min-h-screen rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto mb-8">
        <h1 className="text-white text-8xl font-bold text-center">Skills</h1>
      </div>
      <InfiniteMovingCards
        items={skills}
        direction="right"
        speed="slow"
        pauseOnHover={true}
      />
    </div>
  );
}

const skills = [
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    name: "JavaScript",
    title: "Created by Brendan Eich",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    name: "Node.js",
    title: "Created by Ryan Dahl",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
    name: "Express.js",
    title: "Created by TJ Holowaychuk",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
    name: "C++",
    title: "Created by Bjarne Stroustrup",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    name: "Java",
    title: "Created by James Gosling",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Spring_Boot.svg",
    name: "Spring Boot",
    title: "Created by Pivotal Software",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg",
    name: "Docker",
    title: "Created by Solomon Hykes",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg",
    name: "Kubernetes",
    title: "Created by Google",
  },
];
