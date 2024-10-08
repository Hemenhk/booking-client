"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const links = [
  { name: "Användarvillkor", href: "/page/terms-policy" },
  { name: "Om oss", href: "/page/about-us" },
  { name: "FAQ", href: "/page/faq" },
  { name: "Blog", href: "/page/blog" },
  { name: "Kontakta oss", href: "/page/contact-us" },
];

export default function PageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <div className="flex flex-row min-h-96 my-32 w-2/4 mx-auto justify-normal items-start">
      <aside className="flex flex-col gap-3 border-r h-full">
        <ul className="flex flex-col gap-3 text-lg space-y-4 w-56">
          {links.map((link, index) => (
            <div
              key={link.href}
              className={`flex flex-row items-center w-full gap-3 pb-3 ${
                index < links.length - 1 ? "border-b" : ""
              }`}
            >
              {isActive(link.href) ? <ArrowRight /> : null}
              <Link href={link.href} className="font-light">
                {link.name}
              </Link>
            </div>
          ))}
        </ul>
      </aside>
      <main className="ml-10 h-full">{children}</main>
    </div>
  );
}
