"use client";

import { format } from "date-fns";

type Props = {
  daysOfWeek: Date[];
};

export default function TheDayHeader({ daysOfWeek }: Props) {
  return (
    <div className="flex">
      {/* First cell is empty */}
      <div className="w-16">
        {/* Render day headers */}
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="flex-1 text-center p-3 border-gray-100">
            {format(day, "EEE, MM, d")}
          </div>
        ))}
      </div>
    </div>
  );
}
