import { getHours, getMinutes } from "date-fns";
import { useEffect, useState } from "react";

type TimelineProps = {
  currentTime: Date; // Current time
  startHour: number; // Start hour of the schedule (e.g., 9)
};

export default function TheTimeline({ currentTime, startHour }: TimelineProps) {
  const [timelinePosition, setTimelinePosition] = useState(0);

  useEffect(() => {
    const updateTimelinePosition = () => {
      const currentHour = getHours(currentTime);
      const currentMinute = getMinutes(currentTime);
      const hourSlotHeight = 80; // Height of each hour slot in pixels
      const minuteHeight = hourSlotHeight / 60; // Height per minute

      // Only calculate position if the current time is within the schedule
      if (currentHour >= startHour) {
        const hoursOffset = (currentHour - startHour) * hourSlotHeight;
        const minutesOffset = currentMinute * minuteHeight;
        setTimelinePosition(hoursOffset + minutesOffset);
      }
    };

    // Update the timeline position when the time changes
    updateTimelinePosition();
  }, [currentTime, startHour]);

  return (
    <div
      className="absolute bg-red-500 h-1 w-full z-10"
      style={{
        top: `${timelinePosition}px`, // Position the timeline at the calculated position
      }}
    />
  );
}
