import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const links = [
  {
    name: "Instagram",
    icon: <FaInstagram size={25} />,
    href: "https://www.instagram.com/",
  },
  {
    name: "Facebook",
    icon: <FaFacebookF size={22} />,
    href: "https://www.facebook.com/",
  },
];

const pages = [
  { name: "Blog", href: "/page/blog" },
  { name: "Om oss", href: "/page/about-us" },
  { name: "FAQ", href: "/page/faq" },
  { name: "Användarvilkor", href: "/page/terms-policy" },
  { name: "Kontakta oss", href: "/contact-us" },
];

export default function TheFooter() {
  return (
    <footer className="w-full flex flex-col justify-end min-h-56 bg-neutral-900 space-y-5 p-10 text-neutral-300">
      <div className="w-full flex flex-row justify-between items-center border-b-[0.4px] pb-5 border-neutral-500">
        <h2 className="text-2xl font-semibold">Bookely.</h2>
        <ul className="flex flex-row gap-4 text-xs font-light">
          {pages.map((page) => (
            <Link
              key={page.name}
              href={page.href}
              className="relative w-fit block after:block after:bg-neutral-300 after:content-[''] after:absolute after:h-[1px] after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
            >
              {page.name}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <p className="text-sm font-light">Crafted by Hemen.</p>
          <p className="text-xs font-light text-neutral-500">
            © 2024 Bookely. All rights reserved
          </p>
        </div>
        <ul className="flex flex-row items-center justify-end gap-3 size-10">
          {links.map((link) => (
            <a href={link.href} target="_blank" key={link.name}>
              <div className="bg-neutral-300 text-neutral-900 flex justify-center items-center size-10 rounded-full relative group">
                <div className="absolute inset-0  rounded-full border-2 border-transparent group-hover:border-neutral-300 group-hover:animate-ping-once"></div>
                {link.icon}
              </div>
            </a>
          ))}
        </ul>
      </div>
    </footer>
  );
}
