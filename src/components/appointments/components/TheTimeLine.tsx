"use client";

type Props = {
  hour: number;
  currentMinute: number;
  currentHour: number;
  dayIndex: number;
};

export default function TheTimeLine({
  currentHour,
  currentMinute,
  dayIndex,
  hour,
}: Props) {
  return (
    <>
      {hour === currentHour && (
        <div
          className="absolute left-0 w-full bg-sky-500"
          style={{
            height: "2px",
            top: `${(currentMinute / 60) * 100}%`,
            zIndex: 10,
          }}
        ></div>
      )}
      {hour === currentHour && dayIndex === 0 && (
        <div
          className="absolute z-50 left-0 bg-sky-500 text-white text-xs p-1.5 rounded-l-lg shadow"
          style={{
            top: `${(currentMinute / 60) * 100}%`,
            zIndex: 15,
            transform: "translateX(-100%) translateY(-50%)",
            whiteSpace: "nowrap", // Ensure the time doesn't break into two lines
          }}
        >
          {`${currentHour}:${currentMinute < 10 ? "0" : ""}${currentMinute}`}
        </div>
      )}
    </>
  );
}
