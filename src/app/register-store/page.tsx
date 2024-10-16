import ThePaymentCardContactForm from "@/components/forms/contactForm/ThePaymentCardContactForm";
import ThePaymentCards from "@/components/payments/ThePaymentCards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrera ditt företag",
  description:
    "Välj en av våra planer för att registrera ditt företag och kunna ta emot bokningar idag!",
};

export default function TheRegisterPage() {
  return (
    <main className="flex flex-col justify-center items-center gap-12 pb-24 pt-14 bg-gradient-to-r from-blue-50 via-pink-100 to-blue-50">
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-semibold tracking-tight capitalize">
          Börja ta emot bokningar nu
        </h2>
        <p className="text-gray-500 text-center">
          Alla priser är exklusive moms.
        </p>
      </div>
      <ThePaymentCards />
      <Card className="rounded-3xl shadow-lg mt-10">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">Vill du bli kontaktad?</CardTitle>
        <CardDescription>Fyll i formuläret så hör vi av oss.</CardDescription>
        </CardHeader>
        <CardContent>
          <ThePaymentCardContactForm />
        </CardContent>
      </Card>
    </main>
  );
}
