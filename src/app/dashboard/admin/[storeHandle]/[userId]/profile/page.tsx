"use client";
import ThePasswordCard from "@/components/dashboard/profile/ThePasswordCard";
import ThePhoneCard from "@/components/dashboard/profile/ThePhoneCard";
import TheProfileImageCard from "@/components/dashboard/profile/TheProfileImageCard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAdminQuery } from "@/hooks/useAdminQuery";
import { TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";

export default function AdminProfilePage() {
  const { storeHandle, userId } = useParams<{
    storeHandle: string;
    userId: string;
  }>();

  const { storeData, isLoading, isError } = useAdminQuery(storeHandle);

  const hasPhonenumber = storeData && storeData?.store?.phone_number;


  if (isLoading) {
    return <div>Laddar data</div>;
  }

  if (!storeData) {
    return <div>Finns ingen butik information</div>;
  }

  return (
    <div className="flex flex-col gap-5 mx-2 md:px-0">
       {!hasPhonenumber && (
        <Card className="overflow-hidden max-w-[600px] border-red-700">
          <CardContent className="flex flex-row items-center gap-3 py-2">
            <TriangleAlert size={18} className="text-red-700" />
            <p className="flex flex-row items-center gap-5 text-sm">
              Lägg till ett telefonnummer för att synas i sökmotorn
            </p>
          </CardContent>
        </Card>
      )}
      <ThePhoneCard storeData={storeData.store} />
      {/* Profile image card */}
      <TheProfileImageCard userId={userId} storeData={storeData.store} />
      {/* Password Card */}
      <ThePasswordCard userId={userId} />
    </div>
  );
}
