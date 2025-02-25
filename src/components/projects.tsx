"use client";
import React from "react";
import Link from "next/link";

interface Project {
  name: string;
  description: string;
  videoUrl: string;
  live: string;
}

const projects: Project[] = [
  {
    name: "Urban Snitch",
    description:
      "A full-stack web platform focused on customer safety, featuring secure password hashing and a seamless payment gateway for transactions.",
    videoUrl: "/UrbanSnitch.mp4",
    live: "https://urbansnitch-w7we.vercel.app/",
  },
  {
    name: "Load Balancer with Kubernetes & Docker",
    description:
      "A project demonstrating containerized load balancing using Kubernetes and Docker, enabling automatic scaling and high availability across multiple server instances.",
    videoUrl: "/LoadBalancer.mp4",
    live: "https://drive.google.com/file/d/1iDEFx35sOUNcj38Eeu87Kl2kuY5r2skp/view",
  },
  {
    name: "Conscious Chemist",
    description:
      "A skincare e-commerce website built with ReactJS, offering a responsive and visually appealing interface for browsing and purchasing skincare products.",
    videoUrl: "/conscious-chemist.mp4",
    live: "https://conscious-chemist.vercel.app/",
  },
];

export default function ProjectsSection() {
  return (
    <div
      id="project-section"
      className="min-h-screen px-6 py-12 flex flex-col items-center bg-black"
    >
      <div className="w-full max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl sm:text-3xl font-bold text-white">
          Projects
        </h1>
      </div>

      {/* Project List */}
      <div className="w-full max-w-5xl mx-auto space-y-16">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 bg-gray-950 p-6 rounded-lg shadow-lg overflow-hidden"
          >
            {/* Project Name and Description */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-white text-2xl font-bold mb-3">
                {project.name}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project Video */}
            <div className="flex-1 relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden shadow-md">
              <Link href={project.live} target="_blank" rel="noopener noreferrer">
                <video
                  src={project.videoUrl}
                  className="w-full h-full object-cover rounded-lg"
                  muted
                  loop
                  playsInline
                  autoPlay
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}