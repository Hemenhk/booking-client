"use client";
import TheToolbar from "@/components/dashboard/TheToolbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <div className="flex justify-center md:justify-start h-full">
      <div className="hidden md:flex  relative left-0">
        <TheToolbar />
      </div>
      <section className="mx-auto md:px-10 w-full md:py-10 bg-gray-100">
        {children}
      </section>
    </div>
  );
}