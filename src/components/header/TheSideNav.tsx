import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GeistSans } from "geist/font/sans";
import { Menu } from "lucide-react";
import Link from "next/link";

type Props = {
  links: {
    handle: string;
    href: string;
  }[];
};

export default function TheSideNav({ links }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <nav className="">
          <ul
            className={`${GeistSans.className}text-black flex flex-col space-y-8 pl-8 relative top-36`}
          >
            {links.map((link) => (
              <li key={link.handle} className="border-b pb-4 w-3/4">
                <Link href={link.href} className="text-black text-lg uppercase tracking-wide">
                  {link.handle}
                </Link>
              </li>
            ))}
            <li className="border-b pb-4 w-3/4">
              <Link href={"/business"} className="text-black text-lg uppercase tracking-wide">
                För företag
              </Link>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
