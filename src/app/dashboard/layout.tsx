"use client";
import TheToolbar from "@/components/dashboard/TheToolbar";
import TheDashboardHeader from "@/components/header/TheDashboardHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <h2 className="flex justify-center items-center text-3xl font-bold h-[80vh] tracking-tight">
        Booksy.
      </h2>
    );
  }

  console.log("user id: ", session?.user.id)

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  console.log("session", session?.user);
  return (
    <div className="grid min-h-screen bg-gradient-to-r from-lime-50   to-indigo-50 w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <TheToolbar />
      <div className="flex flex-col">
        <TheDashboardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
