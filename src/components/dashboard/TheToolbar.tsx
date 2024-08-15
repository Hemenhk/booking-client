import Link from "next/link";
import { ReactElement } from "react";
import { FaCalendar, FaHome, FaUser } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { HiCog6Tooth } from "react-icons/hi2";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export interface LinkProps {
  href: string;
  name: string;
  icon?: ReactElement;
}

export default function TheToolbar() {
  const { data: session } = useSession();
  const { storeId, userId } = useParams<{ storeId: string; userId: string }>();

  const adminLinks = [
    { href: "/", name: "Hem", icon: <FaHome /> },
    { href: "/dashboard", name: "Schema", icon: <FaCalendar /> },
    {
      href: "/dashboard/admin/users",
      name: "Användare",
      icon: <FaUser size={13} />,
    },
    { href: "/dashboard/admin/design", name: "Design", icon: <HiCog6Tooth /> },
  ];

  const userLinks = [
    {
      href: "/dashboard/user/${storeId}/${userId}",
      name: "Hem",
      icon: <FaHome size={20}/>,
    },
    {
      href: `/dashboard/user/${storeId}/${userId}/appointments`,
      name: "Bokningar",
      icon: <FaCalendar size={15}/>,
    },
    {
      href: `/dashboard/user/${storeId}/${userId}/create-service`,
      name: "Skapa tjänst",
      icon: <IoCreate size={20}/>,
    },
  ];

  const isAdmin = session?.user.role === "store_admin";

  const getLinks = (isAdmin: boolean) => {
    return isAdmin ? adminLinks : userLinks;
  };

  const linksToRender = getLinks(isAdmin);

  return (
    <ul className="absolute flex shadow-lg w-60 text-black h-full flex-col items-start gap-5 px-4 py-5 bg-transparent">
      {linksToRender.map((link) => (
        <li
          key={link.href}
          className="w-full transition ease-out duration-200 rounded-md hover:bg-violet-200 hover:text-violet-800 tracking-wider text-sm p-2"
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
