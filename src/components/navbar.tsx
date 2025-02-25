"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <p className="font-semibold text-white">Samay Rathod</p>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/">
              <MenuItem setActive={setActive} active={active} item="About" />
            </Link>
            <Link href="/">
              <MenuItem setActive={setActive} active={active} item="Skills" />
            </Link>
            <Link href="/projects">
              <MenuItem setActive={setActive} active={active} item="Projects" />
            </Link>
            {/* <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-transparent dark:bg-black dark:border-white/[0.2] text-white"
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button> */}
          </div>
        </div>
      </Menu>
    </div>
  );
}