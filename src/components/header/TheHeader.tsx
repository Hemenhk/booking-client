"use client";

import { HiOutlineUserCircle } from "react-icons/hi2";
import { GeistSans } from "geist/font/sans";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import TheSideNav from "./TheSideNav";
import useScroll from "@/hooks/useScroll"; // Import the new hook
import useInView from "@/hooks/useInView";
import { useRef } from "react";

const links = [
  { handle: "Home", href: "/" },
  { handle: "Pris", href: "/price" },
  { handle: "Kontakt", href: "/" },
  { handle: "FAQ", href: "/" },
];

export default function TheHeader() {
  const divRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(divRef);
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isBusinessPage = pathname.startsWith("/business");
  const isHomePage = pathname === "/";
  const isAuthenticated = status === "authenticated";

  // Use the custom scroll hook to detect if the user has scrolled past 50px
  const isScrolled = useScroll(50);

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
                        isScrolled
                          ? "text-black"
                          : isHomePage
                          ? "text-white"
                          : "text-black"
                      } `}
                    />
                  </Link>
                );
              case "user":
                return (
                  <Link href={`/dashboard/user/${session?.user.id}`}>
                    <HiOutlineUserCircle
                      className={`size-9 cursor-pointer ${
                        isScrolled
                          ? "text-black"
                          : isHomePage
                          ? "text-white"
                          : "text-black"
                      } `}
                    />
                  </Link>
                );
              default:
                return (
                  <Link
                    href={`/dashboard/sub-user/${session?.user.store.handle}/${session?.user.id}/appointments`}
                  >
                    <HiOutlineUserCircle
                      className={`size-9 cursor-pointer ${
                        isScrolled
                          ? "text-black"
                          : isHomePage
                          ? "text-white"
                          : "text-black"
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
                isScrolled
                  ? "bg-black text-white transition ease-out duration-500 hover:bg-neutral-800"
                  : isHomePage
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
              isScrolled
                ? "text-black after:bg-black"
                : isHomePage
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
          ref={divRef}
          className={`flex items-center justify-between transition-all ease-in-out ${
            isScrolled
              ? "bg-white border-b-[0.6px] h-[7vh] fixed w-full top-0 z-50 duration-300"
              : isHomePage
              ? "absolute z-50 w-full h-[8vh] bg-transparent duration-300"
              : "bg-white border-b-[0.6px] h-[8vh] duration-300"
          } px-8`}
        >
          <div className="flex md:hidden">
            <TheSideNav links={links} />
          </div>

          <Link href={"/"}>
            <h2
              className={`font-bold transition-all duration-500 ease-in-out ${
                isScrolled
                  ? "text-xl tracking-normal"
                  : "text-2xl tracking-tight"
              } ${isHomePage && !isScrolled ? "text-white" : "text-black"} `}
            >
              Bookely.
            </h2>
          </Link>

          {!isDashboardPage && header}
        </div>
      )}
    </>
  );
}
