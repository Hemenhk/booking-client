"use client";
import { Plane } from "lucide-react";
import React from "react";
import TheUserAvatar from "../dashboard/TheUserAvatar";

export default function TheDashboardHeader() {
  return (
    <div className="flex items-center justify-between p-6 shadow-sm">
      <div className="flex items-center gap-2 uppercase text-sm tracking-tight">
        <Plane />
        Influefly
      </div>
      <nav>
        <ul className="flex gap-5 text-sm">
          <li>Home</li>
          <li>Price</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className="flex gap-3">
        <TheUserAvatar />
      </div>
    </div>
  );
}