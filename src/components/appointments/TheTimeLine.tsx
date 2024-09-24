"use client";

import { format, getHours, getMinutes } from "date-fns";
import React, { useState, useEffect } from "react";

export default function TheTimeLine() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const currentHour = getHours(currentTime);
  const currentMinute = getMinutes(currentTime);

  // Do not render the timeline if the time surpasses 7 PM (19:00)
  if (currentHour >= 19) return null;

  const hourHeight = 80; // Ensure this matches the hour cell height
  const topOffset = (currentHour - 9) * hourHeight + (currentMinute / 60) * hourHeight; // Calculate the vertical position

  console.log(`Current Time: ${format(currentTime, "HH:mm")}, Top Offset: ${topOffset}px`); // Debugging output

  return (
    <div
      className="absolute left-16 right-0 h-0.5 bg-blue-400 flex items-center"
      style={{ top: `${topOffset}px` }} // Correctly position the timeline
    >
      <span className="bg-blue-400 text-white text-xs px-2 py-0.5 rounded absolute -left-16">
        {format(currentTime, "HH:mm")}
      </span>
      <div className="flex-1 h-0.5 bg-blue-400"></div>
    </div>
  );
}
