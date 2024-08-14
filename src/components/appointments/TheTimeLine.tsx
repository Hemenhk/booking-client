"use client";

import { format, getHours, getMinutes } from "date-fns";
import React, { useState, useEffect } from "react";

export default function TheTimeLine() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const currentHour = getHours(currentTime);
  const currentMinute = getMinutes(currentTime);

  // Do not render the timeline if the time surpasses 7 PM (19:00)
  if (currentHour >= 19) {
    return null;
  }

  const topOffset = (currentHour - 9) * 64 + (currentMinute / 60) * 64;

  return (
    <div
      className="absolute left-16 right-0 h-0.5 bg-blue-400 flex items-center"
      style={{ top: `${topOffset}px` }}
    >
      <span className="bg-blue-400 text-white text-xs px-2 py-0.5 rounded absolute -left-16">
        {format(currentTime, "HH:mm")}
      </span>
      <div className="flex-1 h-0.5 bg-blue-400"></div>
    </div>
  );
}
