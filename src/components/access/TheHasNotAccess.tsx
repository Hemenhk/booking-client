"use client";

import { CreditCard, TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TheHasNotAccess() {
  const { data: session } = useSession();
  const customerPortalLink =
    "https://billing.stripe.com/p/login/9AQdQRa20gmgawEfYY";


    const link = `/dashboard/admin/akk-26316/subscription-portal`
  return (
    <div className="h-[80vh] w-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-10">
        {/* Icon */}
        <TriangleAlert size={80} className="text-red-500 mb-6" />

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Ingen Aktiv Prenumeration
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg text-center mb-8 w-3/4">
          Din butik har ingen aktiv prenumeration för tillfället. För att
          fortsätta använda våra tjänster, vänligen uppdatera din prenumeration.
        </p>

        {/* Call to action */}
        <Button variant={"link"}>
          <Link href={`/dashboard/admin/${session?.user.store.handle}/renew-subscription`} className="flex flex-row items-center gap-1">
            <CreditCard size={15} />
            Förnya prenumeration
          </Link>
        </Button>
      </div>
    </div>
  );
}
