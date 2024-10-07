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
import { LogOut, Megaphone, ReceiptText, User } from "lucide-react";
import { Separator } from "../ui/separator";

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
        <Avatar className="size-8 md:size-10">
          <AvatarImage src={session?.user.profileImage || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10 px-0">
        <DropdownMenuLabel>Mitt konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          {/* This link */}
          <User size={18} />
          <Link href={profileLink()}>Profil</Link>
        </DropdownMenuItem>
        {isAdmin && status === "authenticated" && session?.user.store ? (
          <DropdownMenuItem className="flex items-center gap-2">
            <ReceiptText size={16} />
            <Link
              href={`/dashboard/admin/${session?.user.store.handle}/subscription-portal`}
            >
              Fakturering
            </Link>
          </DropdownMenuItem>
        ) : null}

        {isAdmin && status === "authenticated" && session?.user.store ? (
          <DropdownMenuItem className="flex items-center gap-2">
            <Megaphone size={18} />
            <Link
              href={`/dashboard/admin/${session?.user.store.handle}/feedback`}
            >
              Feedback
            </Link>
          </DropdownMenuItem>
        ) : null}
<Separator />
        <DropdownMenuItem className="flex items-center gap-2 text-red-400 cursor-pointer hover:text-red-400">
          <LogOut size={18}/>
          <TheSignoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
