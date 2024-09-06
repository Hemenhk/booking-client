"use client";
import { Plane } from "lucide-react";
import React from "react";
import TheUserAvatar from "../dashboard/TheUserAvatar";
import { GeistSans } from "geist/font/sans";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const links = [
  { handle: "Home", href: "/" },
  { handle: "Pris", href: "/price" },
  { handle: "Kontakt", href: "/" },
  { handle: "FAQ", href: "/" },
];

export default function TheHeader() {
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user.role === "store_admin";

  // const dashboardHeader = (
  //   <>
  //     <div className="flex gap-3">
  //       <TheUserAvatar />
  //     </div>
  //   </>
  // );

  const header = (
    <>
      {isAuthenticated ? (
        <div className="flex">
          <Button className="rounded-3xl font-normal bg-black">
            {isAdmin ? (
              <Link href={`/dashboard/admin/${session?.user.store.handle}`}>
                Mina sidor
              </Link>
            ) : (
              <Link
                href={`/dashboard/user/${session?.user.store.handle}/${session?.user.id}`}
              >
                Mina sidor
              </Link>
            )}
          </Button>
        </div>
      ) : (
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
      )}
    </>
  );

  return (
    <>
      {isDashboardPage ? (
        ""
      ) : (
        <div className="flex items-center justify-between h-[8vh] px-8 border-b-[0.6px]">
          <Link href={"/"}>
            <h2 className="font-bold text-2xl tracking-tight">Booksy.</h2>
          </Link>

          {isDashboardPage ? (
            ""
          ) : (
            <nav>
              <ul
                className={`${GeistSans.className} flex items-center space-x-10`}
              >
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
          )}

          {!isDashboardPage && header}
        </div>
      )}
    </>
  );
}
