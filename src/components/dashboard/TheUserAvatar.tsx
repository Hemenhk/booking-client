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
  const customerPortalLink =
    "https://billing.stripe.com/p/login/test_aEU28T9ah6SAeAgcMM";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {isAdmin ? (
            <AvatarImage src={session?.user.store.logo} />
          ) : (
            <AvatarImage src={session?.user.profileImage} />
          )}

          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10">
        <DropdownMenuLabel>Mitt konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/dashboard/user/${session?.user.store._id}/${session?.user.id}/profile`}
          >
            Profil
          </Link>
        </DropdownMenuItem>
        {isAdmin && status === "authenticated" ? (
          <DropdownMenuItem>
            <a
              href={
                customerPortalLink + "?prefilled_email=" + session.user.email
              }
            >
              Billing
            </a>
          </DropdownMenuItem>
        ) : (
          ""
        )}

        <DropdownMenuItem>
          <TheSignoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
