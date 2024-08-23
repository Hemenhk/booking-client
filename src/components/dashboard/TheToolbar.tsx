import Link from "next/link";
import { ReactElement } from "react";
import { FaCalendar, FaHome, FaUser } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { HiCog6Tooth } from "react-icons/hi2";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Calendar, Cog, Home, SquarePen, User } from "lucide-react";

export interface LinkProps {
  href: string;
  name: string;
  icon?: ReactElement;
}

export default function TheToolbar() {
  const { data: session } = useSession();
  const { storeId, userId } = useParams<{ storeId: string; userId: string }>();

  const adminLinks = [
    { href: "/", name: "Hem", icon: <Home className="size-5" /> },
    {
      href: `/dashboard/admin/${session?.user.store.handle}/appointments`,
      name: "Schema",
      icon: <Calendar className="size-5" />,
    },
    {
      href: `/dashboard/admin/${session?.user.store.handle}/users`,
      name: "Användare",
      icon: <User className="size-5" />,
    },
    {
      href: "/dashboard/admin/design",
      name: "Design",
      icon: <Cog className="size-5" />,
    },
  ];

  const userLinks = [
    {
      href: "/dashboard/user/${storeId}/${userId}",
      name: "Hem",
      icon: <Home className="size-5" />,
    },
    {
      href: `/dashboard/user/${storeId}/${userId}/appointments`,
      name: "Bokningar",
      icon: <Calendar className="size-5" />,
    },
    {
      href: `/dashboard/user/${storeId}/${userId}/create-service`,
      name: "Skapa tjänst",
      icon: <SquarePen className="size-5" />,
    },
  ];

  const isAdmin = session?.user.role === "store_admin";

  const getLinks = (isAdmin: boolean) => {
    return isAdmin ? adminLinks : userLinks;
  };

  const linksToRender = getLinks(isAdmin);

  return (
    <ul className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-2xl tracking-tight"
          >
            Booksy.
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
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </ul>
  );
}
