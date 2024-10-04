import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function TheAboutStore({
  description,
}: {
  description: string | undefined;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!description) {
    return null;
  }

  // Split the description and limit it to around 3 lines (e.g. 100 characters)
  const maxWordsToShow = 30;
  const wordsArray = description.split(" ");
  const isLongDescription = wordsArray.length > maxWordsToShow;

  const collapsedText = isLongDescription
    ? wordsArray.slice(0, maxWordsToShow).join(" ") + "..."
    : description;

  return (
    <div className="border-b xl:w-3/4 px-2 text-sm xl:text-base pb-8 space-y-3">
      <div
        className={`text-gray-800 font-normal xl:font-medium transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-full" : "max-h-[4.5rem]"
        } overflow-hidden`}
        style={{
          lineHeight: "1.5rem", // Assuming line height is 1.5rem
        }}
      >
        {isExpanded ? description : collapsedText}
      </div>
      {isLongDescription && (
        <Button onClick={toggleExpand} className="w-18 h-8 text-xs">
          {isExpanded ? "Visa mindre" : "Visa mer"}
        </Button>
      )}
    </div>
  );
}
