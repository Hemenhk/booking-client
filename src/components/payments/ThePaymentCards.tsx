"use client";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";

export const plans = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_dR63cgcwXbUu9KEaEL"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1Q5UYdCwzfkCBOe6wTThCrIF"
        : "",
    price: 699.0,
    duration: "/månaden",
    title: "Månadsvis",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_5kA4gk9kL1fQ7CwfZ4"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1Q5UYMCwzfkCBOe6O1MhaKQU"
        : "",
    price: 599.0,
    duration: "/månaden",
    title: "Kvartalsvis",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_aEU148eF52jU5uodQV"
        : "",
    // priceId:
    //   process.env.NODE_ENV === "development"
    //     ? "price_1PqrntCwzfkCBOe6pSO3ABEI"
    //     : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1Q5UY1CwzfkCBOe6az94LGcm"
        : "",
    price: 499.0,
    duration: "/månaden",
    title: "Årsvis",
  },
];

const benefits = [
  { icon: <Check />, text: "Tillgång till alla våra tjänster" },
  { icon: <Check />, text: "En extra användare utan extra kostnad" },
  { icon: <Check />, text: "Upp till 5 användare" },
  { icon: <Check />, text: "Ingen bokningsavgift" },
  { icon: <Check />, text: "Ingen startavgift" },
  { icon: <Check />, text: "Upp till 15 bilder på din sida" },
];

type PlanSelectionProps = {
  storeId: string | null;
};

export default function ThePaymentCards() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const adminEmail = localStorage.getItem("adminEmail");

    setEmail(adminEmail);
  }, []);

  return (
    <ul className="flex flex-row gap-5">
      {plans.map((plan) => (
        <Card
          key={plan.priceId}
          className={`w-[350px] h-[580px] rounded-3xl shadow-lg overflow-hidden relative ${
            plan.title === "Årsvis"
              ? "bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600"
              : "bg-white"
          }`}
        >
          {/* Frosted Overlay for Årsvis */}
          {plan.title === "Årsvis" && (
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-3xl"></div>
          )}

          <CardHeader
            className={`py-14 px-6 relative z-10 ${
              plan.title === "Årsvis" ? "text-white" : "text-black"
            }`}
          >
            <h4 className="text-lg font-medium tracking-tight">{plan.title}</h4>
            <div className="flex flex-row">
              <CardTitle className="text-6xl font-bold tracking-tight">
                {plan.price} kr{" "}
                <span className="text-base tracking-tight font-normal capitalize">
                  {plan.duration}
                </span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent
            className={`pt-5 border-t mx-8 px-0 relative z-10 ${
              plan.title === "Årsvis" ? "text-white" : "text-gray-700"
            }`}
          >
            <ul className="text-sm space-y-3">
              {benefits.map((benefit) => (
                <li
                  key={benefit.text}
                  className="flex flex-row gap-2 items-center"
                >
                  {benefit.icon}
                  {benefit.text}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className={`w-full h-12 text-lg font-light mt-10 rounded-lg relative z-10 ${
                plan.title === "Årsvis"
                  ? "bg-white text-purple-600 hover:bg-gray-100"
                  : ""
              }`}
            >
              <a href={plan.link + "?prefilled_email=" + email} target="_blank">
                Kom igång
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
}
