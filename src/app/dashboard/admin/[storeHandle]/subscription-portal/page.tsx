"use client";

import { cancelSubscription, getSubscriptionCustomer } from "@/axios/stores";
import { TheSkeletonCard } from "@/components/skeletons/TheSkeletonCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

export default function TheSubscriptionPortalPage() {
  const { data: session } = useSession();
  const customerId = session?.user.store.customerId;
  const commitmentPeriod = session?.user.store.commitmentPeriod || 1; // Default to 1 month if not provided

  const [canCancel, setCanCancel] = useState(false); // State for cancel button
  const [errorMessage, setErrorMessage] = useState(""); // Error message for cancelation attempt
  const [endDate, setEndDate] = useState<Date | null>(null); // State for storing subscription end date
  const [cancellationConfirmed, setCancellationConfirmed] = useState(false);
  const [cancelledDate, setCancelledDate] = useState<Date | null>(null);
  console.log("customer id", customerId);

  // Fetch subscription data
  const {
    data: subscriptionData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["subscription", customerId],
    queryFn: () => {
      if (customerId) {
        return getSubscriptionCustomer(customerId);
      }
      return Promise.reject(new Error("Customer ID is undefined"));
    },
  });

  // Check if subscription data and plan exist before accessing plan cost
  const planCost = subscriptionData?.data?.items.data[0]
    ? subscriptionData?.data?.items.data[0].plan.amount
    : 0;

  // Function to check if the commitment period has passed
  const checkCommitmentPeriod = (data: any) => {
    const commitmentStartDate = new Date(data.start_date * 1000); // Convert Unix timestamp to JavaScript Date

    // Check if the date is valid
    if (isNaN(commitmentStartDate.getTime())) {
      setErrorMessage("Invalid commitment start date.");
      return;
    }

    // Calculate the commitment end date
    const period = data.commitmentPeriod || commitmentPeriod;
    const commitmentEndDate = new Date(commitmentStartDate);
    commitmentEndDate.setMonth(commitmentEndDate.getMonth() + period);

    // Store the end date in state
    setEndDate(commitmentEndDate);

    // Compare current date with commitment end date
    const currentDate = new Date();
    if (currentDate >= commitmentEndDate) {
      setCanCancel(true); // Allow cancellation if the commitment period has passed
    } else {
      setErrorMessage(
        `Du kan säga upp prenumerationen efter ${commitmentEndDate.toLocaleDateString()}`
      );
    }
  };

  // Call checkCommitmentPeriod after subscription data is fetched
  useEffect(() => {
    if (subscriptionData) {
      checkCommitmentPeriod(subscriptionData.data);
    }
  }, [subscriptionData]);

  // Handle cancelation attempt
  const handleCancelSubscription = async () => {
    try {
      const result = await cancelSubscription(customerId); // API call to cancel subscription
      if (result.cancel_at) {
        setCancelledDate(new Date(result.cancel_at * 1000)); // Store the cancellation date
      } else {
        setCancelledDate(endDate); // Use calculated end date
      }
      setCancellationConfirmed(true); // Set cancellation confirmation
    } catch (error) {
      console.error("Error canceling subscription", error);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
    }).format(amount / 100);
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full p-4 pt-10">
        <TheSkeletonCard />
      </div>
    );
  }
  if (!subscriptionData || isError) {
    return <div>No subscription data or an error occurred</div>;
  }

  // Convert Unix timestamps to JavaScript Date objects
  const startDate = new Date(subscriptionData.data.start_date * 1000);
  const billingCycleAnchorDate = new Date(
    subscriptionData.data.billing_cycle_anchor * 1000
  );

  const customerPortalLink =
    "https://billing.stripe.com/p/login/9AQdQRa20gmgawEfYY";

  const getSubscriptionPlan = (commitmentPeriod: number) => {
    switch (commitmentPeriod) {
      case 1:
        return "Månadsvis";
      case 3:
        return "Kvartalsvis";
      case 12:
        return "Årsvis";
      default:
        return null; // Return null or a default icon if country is not in the list
    }
  };

  console.log("plans", subscriptionData?.data?.items);

  return (
    <Card className="overflow-hidden max-w-[700px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Din prenumeration</CardTitle>
        <Button variant={"link"}>
          <a
            href={
              customerPortalLink + "?prefilled_email=" + session?.user.email
            }
            target="_blank"
            className="flex flex-row items-center gap-2"
          >
            <CreditCard size={15} />
            Hantera betalningmetoden
          </a>
        </Button>
      </CardHeader>
      <CardContent className="space-y-7">
        <div className="bg-gray-50 flex flex-row justify-between items-center gap-2 p-3 border rounded-lg">
          <p className="text-sm">
            Plan:{" "}
            <span className="font-medium">
              {getSubscriptionPlan(commitmentPeriod)}
            </span>
          </p>
          <p className="text-sm">
            Kostnad:{" "}
            <span className="font-medium">{formatPrice(planCost)}</span>/månaden
          </p>
        </div>
        {subscriptionData?.data?.items?.data[1]?.quantity !== 0 ? (
          <>
            <div className="bg-gray-50 flex flex-row justify-between items-center gap-2 p-3 border rounded-lg">
              <p className="text-sm">
                Extra användare (199 kr/st):{" "}
                <span className="font-medium">
                  x{subscriptionData?.data?.items?.data[1]?.quantity}
                </span>
              </p>
              <p className="text-sm">
                Kostnad:{" "}
                <span className="font-medium">
                  {formatPrice(
                    subscriptionData?.data?.items?.data[1]?.plan?.amount *
                      subscriptionData?.data?.items?.data[1]?.quantity
                  )}
                </span>
                /månaden
              </p>
            </div>
            <div className="bg-gray-50 flex flex-row justify-between items-center gap-2 p-3 border rounded-lg">
              <p className="text-sm">Total kostnad per månad: </p>
              <p className="text-sm">
                <span className="font-medium">
                  {formatPrice(
                    planCost +
                      subscriptionData?.data?.items?.data[1]?.plan?.amount *
                        subscriptionData?.data?.items?.data[1]?.quantity
                  )}
                </span>
                /månaden
              </p>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="bg-gray-50 flex flex-row justify-between items-center p-3 border rounded-lg">
          <p className="text-sm">
            Startdatum:{" "}
            <span className="font-medium">
              {isNaN(startDate.getTime())
                ? "Invalid Date"
                : startDate.toLocaleDateString()}
            </span>
          </p>

          {endDate && (
            <div className="text-sm">
              <p>
                Prenumerationen upphör:{" "}
                <span className="font-medium">
                  {endDate.toLocaleDateString()}
                </span>
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center justify-between bg-gray-50 p-3 border rounded-lg">
          <p className="text-sm">
            PrenumerationsID:{" "}
            <span className="font-medium">{subscriptionData.data.id}</span>
          </p>
          <p className="text-sm">
            Bindningstid:{" "}
            <span className="font-medium">{commitmentPeriod} månader</span>
          </p>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <Button variant={"destructive"} onClick={handleCancelSubscription}>
            Avsluta Prenumeration
          </Button>
          {cancellationConfirmed && cancelledDate && (
            <p>Din prenumeration avslutas {cancelledDate.toDateString()}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
