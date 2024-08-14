"use client";
import { Plane } from "lucide-react";
import React from "react";
import TheUserAvatar from "../dashboard/TheUserAvatar";
import { GeistSans } from "geist/font/sans";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { handle: "Home", href: "/" },
  { handle: "Pris", href: "/price" },
  { handle: "Kontakt", href: "/" },
  { handle: "FAQ", href: "/" },
];

export default function TheHeader() {
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith("/dashboard");

  const dashboardHeader = (
    <>
      <div className="flex gap-3">
        <TheUserAvatar />
      </div>
    </>
  );

  const header = (
    <div className={`flex items-center space-x-8 ${GeistSans.className}`}>
      <Link
        href={"/signin"}
        className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[2px]  after:bg-black  after:w-2/4 after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
      >
        Logga in
      </Link>
      <Button className="rounded-3xl font-normal bg-black">
        <Link href={"/register"}> Prova gratis</Link>
      </Button>
    </div>
  );

  return (
    <div className="flex items-center justify-between p-6 border-b-[0.6px]">
      <h2 className="font-bold text-2xl tracking-tight">Booksy.</h2>
      <nav>
        <ul className={`${GeistSans.className} flex items-center space-x-10`}>
          {links.map((link) => (
            <li
              key={link.handle}
              className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[2px]  after:bg-black  after:w-2/4 after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
            >
              <Link href={link.href}>{link.handle}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {isDashboardPage ? dashboardHeader : header}
    </div>
  );
}
