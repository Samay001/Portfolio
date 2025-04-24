"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
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

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-4xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <p className="font-semibold text-white">Samay Rathod</p>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="#about-section">
              <MenuItem setActive={setActive} active={active} item="About" />
            </Link>
            <Link href="#project-section">
              <MenuItem setActive={setActive} active={active} item="Projects" />
            </Link>
            <Link href="#skills-section">
              <MenuItem setActive={setActive} active={active} item="Skills" />
            </Link>
          </div>
        </div>
      </Menu>
    </div>
  );
}