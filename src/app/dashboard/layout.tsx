"use client";
import TheToolbar from "@/components/dashboard/TheToolbar";
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

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  console.log("session", session?.user);
  return (
    <div className="flex justify-center md:justify-start bg-gradient-to-r from-lime-50 via-orange-50 to-violet-50 h-screen">
      <div className="hidden md:flex absolute h-full w-72 left-0 bg-transparent">
        <TheToolbar />
      </div>
      <section className="mx-auto md:px-10 w-[85%] md:py-10 md:relative md:left-[120px]">
        {children}
      </section>
    </div>
  );
}
