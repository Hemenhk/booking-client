import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/utils/faq";

const toRomanNumerals = (num: number) => {
  const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  let result = "";

  for (const { value, numeral } of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }

  return result;
};

export default function FAQPage() {
  return (
    <div>
      <h1 className="text-3xl text-neutral-800 font-bold pb-10">
        Vanliga frågor (FAQ)
      </h1>

      <Accordion type="single" collapsible className="w-[450px]">
        {faqData.map((item, idx) => (
          <AccordionItem
            key={idx}
            value={item.question}
            className="w-full py-2"
          >
            <AccordionTrigger className="text-neutral-800">
              {toRomanNumerals(idx + 1)}. {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-neutral-700">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
