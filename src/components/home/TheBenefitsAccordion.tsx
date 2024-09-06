"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import phone from "../../../public/phone-1.png";

const accordionItems = [
  {
    value: "item-1",
    title: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-2",
    title: "Is it customizable?",
    content: "Yes. It comes with various customization options.",
  },
  {
    value: "item-3",
    title: "Is it responsive?",
    content: "Yes. It is fully responsive and works on all devices.",
  },
];

export default function TheBenefitsAccordion() {
  const [activeItem, setActiveItem] = useState("item-1");

  useEffect(() => {
    const items = ["item-1", "item-2", "item-3"];
    const currentIndex = items.indexOf(activeItem);

    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % items.length;
      setActiveItem(items[nextIndex]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeItem]);

  return (
    <section className="flex flex-row items-center bg-white py-32 px-48">
      <div className="flex flex-col w-2/5">
        <h3 className="text-4xl font-semibold mb-12 text-gray-800">
          Varför välja oss?
        </h3>
        <Accordion
          type="single"
          collapsible
          className="max-w-3xl"
          value={activeItem}
          onValueChange={setActiveItem}
        >
          {accordionItems.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className={`relative ${
                activeItem === `${item.value}` ? "border-b border-gray-300" : ""
              }`}
            >
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
              {activeItem === `${item.value}` && (
                <div className="absolute bottom-0 left-0 h-[3px] w-full bg-transparent">
                  <div className="h-full bg-gray-700 animate-progress-bar"></div>
                </div>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="w-3/5 flex items-center justify-center animate-fade-in">
        <Image src={phone} alt="phone" className="relative" width={400} height={400} />
      </div>
    </section>
  );
}
