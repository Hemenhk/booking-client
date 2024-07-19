import Link from "next/link";
import { ReactElement } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { HiCog6Tooth } from "react-icons/hi2";

export const links = [
  { href: "/dashboard", name: "Hem", icon: <FaHome /> },
  { href: "/dashboard/admin", name: "Uppdrag", icon: <IoCreate /> },
  {
    href: "/dashboard/admin/users",
    name: "Användare",
    icon: <FaUser size={13} />,
  },
  { href: "/dashboard/admin/design", name: "Design", icon: <HiCog6Tooth /> },
];

export const userLinks = [
  { href: "/dashboard", name: "Hem", icon: <FaHome /> },
  { href: "/dashboard/admin", name: "Uppdrag", icon: <IoCreate /> },
];

export interface LinkProps {
  href: string;
  name: string;
  icon?: ReactElement;
}

export default function TheToolbar() {
  //   const renderLinks = (links: LinkProps[]) => {
  //     return links.map((link) => (
  //       <li
  //         key={link.href}
  //         className="w-full transition ease-out duration-200 rounded-md hover:bg-violet-200 hover:text-violet-800 uppercase tracking-wider text-sm p-2"
  //       >
  //         <Link href={link.href} className="flex items-center gap-3">
  //           {link.icon}
  //           {link.name}
  //         </Link>
  //       </li>
  //     ));
  //   };

  return (
    <ul className="flex shadow-lg w-60 bg-violet-500 text-white h-full flex-col items-start gap-5 px-4 py-5">
      {/* {renderLinks(linksToRender)} */}
      {links.map((link) => (
        <li
          key={link.href}
          className="w-full transition ease-out duration-200 rounded-md hover:bg-violet-200 hover:text-violet-800 uppercase tracking-wider text-sm p-2"
        >
          <Link href={link.href} className="flex items-center gap-3">
            {link.icon}
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
