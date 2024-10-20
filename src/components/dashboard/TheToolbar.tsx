import Link from "next/link";
import { ReactElement } from "react";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Calendar, Clock3, Home, SquarePen, Store, User } from "lucide-react";
import TheUserAvatar from "./TheUserAvatar";
import { useAdminQuery } from "@/hooks/useAdminQuery";

export interface LinkProps {
  href: string;
  name: string;
  icon?: ReactElement;
  showRedIndicator?: boolean;
}

export default function TheToolbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { storeHandle, userId } = useParams<{
    storeHandle: string;
    userId: string;
  }>();

  console.log("session", session);

  const { storeData } = useAdminQuery(storeHandle);

  const hasOpeningHours =
    storeData && storeData?.store?.opening_hours.length > 0;

  const hasServices = storeData && storeData?.store?.admin.services.length > 0;

  const hasCategories = storeData && storeData?.store?.categories?.length > 0;

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
      showRedIndicator: !hasServices,
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
      showRedIndicator: !hasOpeningHours,
    },
    {
      href: `/dashboard/admin/${storeHandle}/store-info`,
      name: "Butik",
      icon: <Store className="size-5" />,
      showRedIndicator: !hasCategories,
    },
  ];

  const userLinks = [
    {
      href: `/dashboard/sub-user/${storeHandle}/${userId}/appointments`,
      name: "Schema",
      icon: <Calendar className="size-5" />,
      showRedIndicator: false,
    },
    {
      href: `/dashboard/sub-user/${storeHandle}/${userId}/service`,
      name: "Tjänster",
      icon: <SquarePen className="size-5" />,
      showRedIndicator: false,
    },
  ];

  const standardUserLinks = [
    {
      href: `/dashboard/user/${userId}`,
      name: "Hem",
      icon: <Home className="size-5" />,
      showRedIndicator: false,
    },
    {
      href: `/dashboard/user/${userId}/appointments`,
      name: "Mina Bokningar",
      icon: <Calendar className="size-5" />,
      showRedIndicator: false,
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
            <span className="hidden md:flex">Bookely.</span>{" "}
            <span className="flex md:hidden">B.</span>
          </Link>
        </div>
        <div className="flex-1 pt-5">
          <nav className="grid items-start space-y-3 px-2 text-sm font-medium lg:px-4">
            {linksToRender.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary  ${
                  pathname === link.href ? "text-primary bg-[#eeeeee] font-medium" : ""
                }`}
              >
                <div className="relative">
                  {link.icon}

                  {link.showRedIndicator && (
                    <span className="absolute size-3 -top-1 -right-1 rounded-full bg-red-600" />
                  )}
                </div>

                <span className="flex items-center">{link.name}</span>
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
