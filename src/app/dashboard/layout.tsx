"use client";
import TheHasNotAccess from "@/components/access/TheHasNotAccess";
import TheToolbar from "@/components/dashboard/TheToolbar";
import TheDashboardHeader from "@/components/header/TheDashboardHeader";
import TheDashboardHeaderMobile from "@/components/header/TheDashboardHeaderMobile";
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
        Bookely.
      </h2>
    );
  }

  console.log("user id: ", session?.user.id);

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  if (session?.user.store.hasAccess === false){
    return <TheHasNotAccess />
  }

  console.log("session", session?.user);

  return (
    <div className="grid min-h-screen bg-zinc-50 w-full  md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <TheToolbar />
      <TheDashboardHeaderMobile />
      <main className="flex md:hidden flex-col w-full gap-4 py-4 lg:gap-6 lg:p-6">
        {children}
      </main>
      <div className="flex flex-col h-full">
        <div className="hidden md:block">
          <TheDashboardHeader />
          <main className="hidden md:flex flex-col w-full gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
