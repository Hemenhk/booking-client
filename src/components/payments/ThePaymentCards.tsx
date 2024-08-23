"use client"
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useSession } from "next-auth/react";

const plans = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_fZe004gNdbUu7Cw7su"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1Pqs0BCwzfkCBOe6vWttZmD5"
        : "",
    price: 699.0,
    duration: "/månaden",
    title: "Månadsvis",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_aEU148cwXaQq9KEaEH"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1PqrzCCwzfkCBOe6iDD1jyvA"
        : "",
    price: 599.0,
    duration: "/månaden",
    title: "Kvartalsvis",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_aEUbIM40r1fQcWQcMQ"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1PqrntCwzfkCBOe6pSO3ABEI"
        : "",
    price: 499.0,
    duration: "/månaden",
    title: "Årsvis",
  },
];

const benefits = [
  { icon: <Check />, text: "Tillgång till alla våra tjänster" },
  { icon: <Check />, text: " Upp till 5 anställda" },
  { icon: <Check />, text: "Ingen bokningsavgift" },
  { icon: <Check />, text: "Ingen startavgift" },
  { icon: <Check />, text: "Automatisk bokföring" },
];
export default function ThePaymentCards() {
    const {data: session} = useSession()
  return (
    <ul className="flex flex-row gap-5">
      {plans.map((plan) => (
        <Card
          key={plan.priceId}
          className={`w-[350px] h-[550px] rounded-3xl shadow-lg overflow-hidden relative ${
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
                <a href={plan.link + "?prefilled_email=" + session?.user?.email} target="_blank">Kom igång</a>
           
            </Button>
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
}
