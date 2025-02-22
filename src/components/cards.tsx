import { HoverEffect } from "./ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-8">
      <div className="w-full mx-auto mt-12">
        <h1 className="text-white text-8xl max-w-7xl mb-10 font-bold text-center">
          Skills
        </h1>
      </div>
      <HoverEffect skills={skills} />
    </div>
  );
}

export const skills = [
  {
    skillName: "JavaScript",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    founder: "Brendan Eich",
  },
  {
    skillName: "React",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    founder: "Jordan Walke",
  },
  {
    skillName: "Python",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    founder: "Guido van Rossum",
  },
  {
    skillName: "Node.js",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    founder: "Ryan Dahl",
  },
  {
    skillName: "AWS",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    founder: "Amazon",
  },
  {
    skillName: "Docker",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg",
    founder: "Solomon Hykes",
  },
];
