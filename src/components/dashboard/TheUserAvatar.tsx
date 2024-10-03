"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import TheSignoutBtn from "./TheSignoutBtn";
import { useSession } from "next-auth/react";

export default function TheUserAvatar() {
  const { data: session, status } = useSession();

  const isAdmin = session?.user.role === "store_admin";
  const isSubUser = session?.user.role === "sub_user";
  const isUser = session?.user.role === "user";

  const profileLink = () => {
    if (isAdmin && session?.user.store) {
      return `/dashboard/admin/${session?.user.store.handle}/${session?.user.id}/profile`;
    } else if (isSubUser && session?.user.store) {
      return `/dashboard/sub-user/${session?.user.store.handle}/${session?.user.id}/profile`;
    } else {
      return `/dashboard/user/${session?.user.id}/profile`;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session?.user.profileImage || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10">
        <DropdownMenuLabel>Mitt konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {/* This link */}
          <Link href={profileLink()}>Profil</Link>
        </DropdownMenuItem>
        {isAdmin && status === "authenticated" && session?.user.store ? (
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/${session?.user.store.handle}/subscription-portal`}
            >
              Fakturering
            </Link>
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuItem>
          <TheSignoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
