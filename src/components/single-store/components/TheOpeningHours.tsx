import { OpeningHours } from "@/types/types";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  openingHours: OpeningHours[] | undefined;
};

const validDays: Record<string, keyof OpeningHours> = {
  mon: "monday",
  tue: "tuesday",
  wed: "wednesday",
  thu: "thursday",
  fri: "friday",
  sat: "saturday",
  sun: "sunday",
};

export default function TheOpeningHours({ openingHours }: Props) {
  const [showFullWeek, setShowFullWeek] = useState(false);
  if (!openingHours) {
    return <div>No opening hours</div>;
  }
  const currentDayKey = format(new Date(), "EEE").toLowerCase();
  console.log("Current day key:", currentDayKey); // Debugging log

  // Map the abbreviation to the full day name, fallback to undefined if no match
  const currentDay = validDays[currentDayKey];
  console.log("Mapped current day:", currentDay); // Debugging log

  // Safeguard in case the mapping or opening hours are undefined
  const currentDayHours = currentDay
    ? openingHours[0]?.[currentDay]
    : undefined;
  console.log("Current day hours:", currentDayHours); // Debugging log

  const renderOpeningHours = (openingHours: OpeningHours) => {
    return Object.entries(openingHours)
      .filter(([day]) => day !== "_id")
      .map(([day, hours]) => (
        <li key={day} className="flex items-center justify-between py-2 text-sm">
          <span className="capitalize font-light text-gray-600">{day}:</span>
          {hours.closed ? (
            <span className="text-gray-500">Closed</span>
          ) : (
            <span className="font-medium">
              {hours.open} - {hours.close}
            </span>
          )}
        </li>
      ));
  };

  return (
    <div className="py-4">
      {!showFullWeek ? (
        <>
          <div className="py-2 flex justify-between items-center text-gray-600 font-medium">
            <span className="font-light">Idag</span>
            {currentDayHours ? (
              currentDayHours.closed ? (
                <span className="text-gray-500">Stängt</span>
              ) : (
                <span>
                  {currentDayHours.open} - {currentDayHours.close}
                </span>
              )
            ) : (
              <span className="text-gray-500">No hours available</span>
            )}
          </div>
          <span
            className="flex items-center gap-3 pt-5 cursor-pointer font-light text-sm w-full"
            onClick={() => setShowFullWeek((prevState) => !prevState)}
          >
            Visa hela veckans öppettider <ChevronDown size={15}/>
          </span>
        </>
      ) : (
        <ul className="pt-2">{renderOpeningHours(openingHours[0])}</ul>
      )}
    </div>
  );
}
