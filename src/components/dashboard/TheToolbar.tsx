import Link from "next/link";
import { ReactElement } from "react";
import { FaCalendar, FaHome, FaUser } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { HiCog6Tooth } from "react-icons/hi2";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Calendar,
  Clock3,
  Cog,
  Factory,
  Home,
  SquarePen,
  Store,
  User,
} from "lucide-react";
import TheUserAvatar from "./TheUserAvatar";

export interface LinkProps {
  href: string;
  name: string;
  icon?: ReactElement;
}

export default function TheToolbar() {
  const { data: session } = useSession();
  const { storeHandle, userId } = useParams<{
    storeHandle: string;
    userId: string;
  }>();

  const adminLinks = [
    {
      href: `/dashboard/admin/${storeHandle}`,
      name: "Hem",
      icon: <Home className="size-5" />,
    },
    {
      href: `/dashboard/admin/${storeHandle}/appointments`,
      name: "Schema",
      icon: <Calendar className="size-5" />,
    },
    {
      href: `/dashboard/admin/${storeHandle}/${session?.user.id}/service`,
      name: "Tjänster",
      icon: <SquarePen className="size-5" />,
    },
    {
      href: `/dashboard/admin/${storeHandle}/users`,
      name: "Användare",
      icon: <User className="size-5" />,
    },
    {
      href: `/dashboard/admin/${storeHandle}/opening-hours`,
      name: "Öppettider",
      icon: <Clock3 className="size-5" />,
    },
    {
      href: `/dashboard/admin/${storeHandle}/store-info`,
      name: "Butik",
      icon: <Store className="size-5" />,
    },
  ];

  const userLinks = [
    {
      href: `/dashboard/sub-user/${storeHandle}/${userId}`,
      name: "Hem",
      icon: <Home className="size-5" />,
    },
    {
      href: `/dashboard/sub-user/${storeHandle}/${userId}/appointments`,
      name: "Schema",
      icon: <Calendar className="size-5" />,
    },
    {
      href: `/dashboard/sub-user/${storeHandle}/${userId}/service`,
      name: "Tjänster",
      icon: <SquarePen className="size-5" />,
    },
  ];

  const standardUserLinks = [
    {
      href: `/dashboard/user/${userId}`,
      name: "Hem",
      icon: <Home className="size-5" />,
    },
    {
      href: `/dashboard/user/${userId}/appointments`,
      name: "Mina Bokningar",
      icon: <Calendar className="size-5" />,
    },
  ];

  const getLinks = (userRole: string) => {
    switch (userRole) {
      case "store_admin":
        return adminLinks;
      case "sub_user":
        return userLinks;
      case "user":
        return standardUserLinks;
      default:
        return [];
    }
  };

  const linksToRender = getLinks(session?.user.role || "");

  return (
    <ul className="hidden md:block border-r bg-muted/40 w-14 md:w-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-2xl tracking-tight"
          >
            <span className="hidden md:flex">Booksy.</span>{" "}
            <span className="flex md:hidden">B.</span>
          </Link>
        </div>
        <div className="flex-1 pt-5">
          <nav className="grid items-start space-y-3 px-2 text-sm font-medium lg:px-4">
            {linksToRender.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                {link.icon}
                <span className="hidden md:flex">{link.name}</span>
              </Link>
            ))}
          </nav>
          <div className="flex justify-center pt-20 px-3 md:hidden ">
            <TheUserAvatar />
          </div>
        </div>
      </div>
    </ul>
  );
}
