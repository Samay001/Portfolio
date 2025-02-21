"use client";
import React from "react";

interface Project {
  name: string;
  description: string;
  videoUrl: string;
}

const projects: Project[] = [
  {
    name: "Project 1",
    description:
      "This is a description of Project 1. It showcases my skills in XYZ and demonstrates my ability to solve complex problems This is a description of Project 1. It showcases my skills in XYZ and demonstrates my ability to solve complex problems. This is a description of Project 1. It showcases my skills in XYZ and demonstrates my ability to solve complex problems.This is a description of Project 1. It showcases my skills in XYZ and demonstrates my ability to solve complex problems.",
    videoUrl: "/loadBalancer.mkv", // Replace with your video URL
  },
  {
    name: "Project 2",
    description:
      "This is a description of Project 2. It highlights my expertise in ABC and my ability to deliver high-quality results.",
    videoUrl: "/loadBalancer.mkv", // Replace with your video URL
  },
  {
    name: "Project 3",
    description:
      "This is a description of Project 3. It demonstrates my proficiency in DEF and my commitment to innovation.",
    videoUrl: "/loadBalancer.mkv", // Replace with your video URL
  },
  {
    name: "Project 4",
    description:
      "This is a description of Project 4. It showcases my ability to collaborate effectively and deliver impactful solutions.",
    videoUrl: "/loadBalancer.mkv", // Replace with your video URL
  },
];

export const ProjectsSection = () => {
  return (
    <div className="min-h-screen flex flex-col mx-auto">
      <div className="w-full mx-auto mb-8 mt-8">
        <h1 className="text-white text-8xl max-w-7xl font-bold text-center">Projects</h1>
      </div>

      {/* Project List */}
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Project Name and Description */}
            <div className="flex-1">
              <h2 className="text-white text-2xl font-bold mb-4">
                {project.name}
              </h2>
              <p className="text-white text-lg">{project.description}</p>
            </div>

            {/* Project Video */}
            <div className="flex-1 relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden">
              <video
                src={project.videoUrl}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};