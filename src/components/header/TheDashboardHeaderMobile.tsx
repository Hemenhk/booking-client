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
import Link from "next/link";

export default function TheDashboardHeaderMobile() {
  const { data: session } = useSession();
  const { storeHandle, userId } = useParams<{
    storeHandle: string;
    userId: string;
  }>();
  const adminLinks = [
    {
      href: `/dashboard/admin/${storeHandle}`,
      name: "Hem",
      icon: <Home className="size-6" />,
    },
    {
      href: `/dashboard/admin/${storeHandle}/appointments`,
      name: "Schema",
      icon: <Calendar className="size-6" />,
    },
    // {
    //   href: `/dashboard/admin/${storeHandle}/${session?.user.id}/service`,
    //   name: "Tjänster",
    //   icon: <SquarePen className="size-6" />,
    // },
    {
      href: `/dashboard/admin/${storeHandle}/users`,
      name: "Användare",
      icon: <User className="size-6" />,
    },
    {
      href: `/dashboard/admin/${storeHandle}/opening-hours`,
      name: "Öppettider",
      icon: <Clock3 className="size-6" />,
    },
    {
      href: `/dashboard/admin/${storeHandle}/store-info`,
      name: "Butik",
      icon: <Store className="size-6" />,
    },
  ];

  const userLinks = [
    {
      href: `/dashboard/sub-user/${storeHandle}/${userId}`,
      name: "Hem",
      icon: <Home className="size-6" />,
    },
    {
      href: `/dashboard/sub-user/${storeHandle}/${userId}/appointments`,
      name: "Schema",
      icon: <Calendar className="size-6" />,
    },
    // {
    //   href: `/dashboard/sub-user/${storeHandle}/${userId}/service`,
    //   name: "Tjänster",
    //   icon: <SquarePen className="size-6" />,
    // },
  ];

  const standardUserLinks = [
    {
      href: `/dashboard/user/${userId}`,
      name: "Hem",
      icon: <Home className="size-6" />,
    },
    {
      href: `/dashboard/user/${userId}/appointments`,
      name: "Mina Bokningar",
      icon: <Calendar className="size-6" />,
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
    <div className="w-full h-20 bg-black flex justify-center items-center text-white fixed bottom-0 md:hidden">
      <nav className="flex flex-row gap-3">
        {linksToRender.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-white"
          >
            {link.icon}
          </Link>
        ))}
      </nav>
    </div>
  );
}
