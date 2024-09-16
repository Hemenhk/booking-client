import { OpeningHours } from "@/types/types";

type Props = {
  openingHours: OpeningHours[] | undefined;
};

export default function TheOpeningHours({ openingHours }: Props) {
  if (!openingHours) {
    return <div>No opening hours</div>;
  }

  const renderOpeningHours = (openingHours: OpeningHours) => {
    return Object.entries(openingHours)
      .filter(([day]) => day !== "_id")
      .map(([day, hours]) => (
        <li key={day} className="flex items-center justify-between py-2">
          <span className="capitalize font-light">{day}:</span>
          {hours.closed ? (
            <span className="text-gray-500">Closed</span>
          ) : (
            <span className="font-light">
              {hours.open} - {hours.close}
            </span>
          )}
        </li>
      ));
  };

  return (
    <div className="p-4">
      <h3 className="font-light">Opening Hours</h3>
      <ul className="pt-2">{renderOpeningHours(openingHours[0])}</ul>
    </div>
  );
}
