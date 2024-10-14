"use client";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { renewSubscription } from "@/axios/stores"; // Your axios call for renew subscription
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { Button } from "@/components/ui/button";

export const plans = [
  {
    link: "https://buy.stripe.com/8wMbM29va7Ri3za7su",
    priceId: "price_1Q7wSaCwzfkCBOe6ywsf0GS1",
    price: 699.0,
    duration: "/Månaden",
    title: "Månadsvis",
  },
  {
    link: "https://buy.stripe.com/3cs9DUaze9Zq0mYdQR",
    priceId: "price_1Q7wQlCwzfkCBOe6W5O0URvl",
    price: 599.0,
    discountPrice: 299,
    duration: "/Månaden",
    title: "Kvartalsvis",
  },
  {
    link: "https://buy.stripe.com/test_aEU148eF52jU5uodQV",
    priceId: "price_1Q5UY1CwzfkCBOe6az94LGcm",
    price: 499.0,
    discountPrice: 249,
    duration: "/Månaden",
    title: "Årsvis",
  },
];

const benefits = [
  { icon: <Check />, text: "Tillgång till alla våra tjänster" },
  {
    icon: <Check />,
    text: "1st extra användare utan extra kostnad till värde av 199kr/månaden",
  },
  { icon: <Check />, text: "Upp till 5 användare" },
  { icon: <Check />, text: "Ingen bokningsavgift" },
  { icon: <Check />, text: "Ingen startavgift" },
  { icon: <Check />, text: "Upp till 15 bilder på din sida" },
];

export default function RenewSubPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string | null>(null);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { storeData } = useAdminQuery(session?.user.store.handle);

  // Handle the renew subscription call
  const handleRenewSubscription = async (priceId: string) => {
    try {
      const res = await renewSubscription(
        storeData?.store?.customerId,
        priceId
      );
      console.log("renewed sub", res);
    } catch (error) {
      console.log("Error renewing subscription:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Förnya din prenumeration</h2>
      <ul className="flex flex-row gap-5">
        {plans.map((plan) => (
          <Card
            key={plan.priceId}
            className={`w-[400px] h-[625x] rounded-3xl shadow-lg overflow-hidden relative ${
              plan.title === "Årsvis"
                ? "bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600"
                : "bg-white"
            }`}
          >
            {plan.title === "Årsvis" && (
              <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-3xl"></div>
            )}

            <CardHeader
              className={`py-14 px-5 relative z-10 ${
                plan.title === "Årsvis" ? "text-white" : "text-black"
              }`}
            >
              <h4 className="text-lg font-medium tracking-tight">
                {plan.title}
              </h4>
              <div className="flex flex-col">
                {plan.discountPrice ? (
                  <div className="space-y-3">
                    <CardTitle className="text-6xl font-bold tracking-tight">
                      {plan.discountPrice} kr{" "}
                      <span className="text-xs tracking-tight font-normal">
                        {plan.duration} i 3 månader
                      </span>
                    </CardTitle>

                    <CardTitle className="text-4xl font-bold tracking-tight">
                      {plan.price} kr{" "}
                      <span className="text-xs tracking-tight font-normal">
                        {plan.duration} därefter
                      </span>
                    </CardTitle>
                  </div>
                ) : (
                  <CardTitle className="text-6xl font-bold tracking-tight">
                    {plan.price} kr{" "}
                    <span className="text-xs tracking-tight font-normal">
                      {plan.duration}
                    </span>
                  </CardTitle>
                )}
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
                className={`w-full h-12 text-lg font-light mt-6 rounded-lg relative z-10 ${
                  plan.title === "Årsvis"
                    ? "bg-white text-purple-600 hover:bg-gray-100"
                    : ""
                }`}
              >
                <a
                  href={`${plan.link}?prefilled_email=${storeData?.store?.admin.email}&customer_id=${storeData?.store?.customerId}`} // Append customerId here
                  target="_blank"
                >
                  Kom igång
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
}
