"use client";
import { CircleUser, CircleUserRound, Plane } from "lucide-react";
import React from "react";
import TheUserAvatar from "../dashboard/TheUserAvatar";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { GeistSans } from "geist/font/sans";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import TheSideNav from "./TheSideNav";

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
  const isBusinessPage = pathname.startsWith("/business");
  const isHomePage = pathname === "/";
  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user.role === "store_admin";
  const isNotStoreUser = session?.user.role === "user";

  const header = (
    <>
      {isAuthenticated ? (
        <div className="flex md:items-center md:gap-3">
          {(() => {
            switch (session?.user.role) {
              case "store_admin":
                return (
                  <Link href={`/dashboard/admin/${session?.user.store.handle}`}>
                    <HiOutlineUserCircle
                      className={`size-9 cursor-pointer ${
                        isHomePage ? "text-white" : "text-black"
                      } `}
                    />
                  </Link>
                );
              case "user":
                return (
                  <Link href={`/dashboard/user/${session?.user.id}`}>
                    <HiOutlineUserCircle
                      className={`size-9 cursor-pointer ${
                        isHomePage ? "text-white" : "text-black"
                      } `}
                    />
                  </Link>
                );
              default:
                return (
                  <Link
                    href={`/dashboard/user/${session?.user.store.handle}/${session?.user.id}`}
                  >
                    <HiOutlineUserCircle
                      className={`size-9 cursor-pointer ${
                        isHomePage ? "text-white" : "text-black"
                      } `}
                    />
                  </Link>
                );
            }
          })()}

          {isBusinessPage ? (
            ""
          ) : (
            <Button
              className={`hidden md:flex rounded-lg px-8 h-8 font-medium ${
                isHomePage
                  ? "bg-white text-black transition ease-out duration-500 hover:bg-gray-200"
                  : ""
              } `}
            >
              <Link href={"/business"}>För Företag</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className={`flex items-center space-x-8 ${GeistSans.className}`}>
          <Link
            href={"/signin"}
            className={`relative ${
              isHomePage
                ? "text-white after:bg-white "
                : "text-black after:bg-black"
            }  w-fit block after:block after:content-[''] after:absolute after:h-[2px]   after:w-2/4 after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
          >
            Logga in
          </Link>
          <Button
            className={`rounded-lg px-8 h-8 font-medium ${
              isHomePage
                ? "bg-white text-black transition ease-out duration-500 hover:bg-gray-200"
                : ""
            } `}
          >
            <Link href={"/business"}>Företag</Link>
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
        <div
          className={`flex items-center justify-between bg-transparent ${
            isHomePage ? "absolute z-50 w-full" : "bg-white border-b-[0.6px]"
          } h-[8vh] px-8`}
        >
          <div className="flex md:hidden">

          <TheSideNav links={links}/>
          </div>

          <Link href={"/"}>
            <h2
              className={` font-bold text-2xl tracking-tight ${
                isHomePage ? "text-white" : "text-black"
              } `}
            >
              Bookely.
            </h2>
          </Link>

          {isDashboardPage ? (
            ""
          ) : (
            <nav className="hidden md:flex">
              <ul
                className={`${GeistSans.className} ${
                  isHomePage ? "text-white" : "text-black"
                }  flex items-center space-x-10`}
              >
                {links.map((link) => (
                  <li
                    key={link.handle}
                    className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] ${
                      isHomePage ? "after:bg-white" : "after:bg-black"
                    }   after:w-2/4 after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
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
