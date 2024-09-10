

import { Search, Menu, CircleUser } from 'lucide-react';
import Link from 'next/link';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import TheUserAvatar from '../dashboard/TheUserAvatar';
// import UpgradeCard from './UpgradeCard';
// import NavItem from './NavItem';

export default function TheDashboardHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {/* <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <NavItem href="#" icon={<Home className="h-5 w-5" />} label="Dashboard" />
            <NavItem href="#" icon={<ShoppingCart className="h-5 w-5" />} label="Orders" active badge={<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>} />
            <NavItem href="#" icon={<Package className="h-5 w-5" />} label="Products" />
            <NavItem href="#" icon={<Users className="h-5 w-5" />} label="Customers" />
            <NavItem href="#" icon={<LineChart className="h-5 w-5" />} label="Analytics" />
          </nav>
          <div className="mt-auto">
            <UpgradeCard />
          </div>
        </SheetContent>
      </Sheet> */}
      <div className="w-full flex-1">
      
      </div>
      <TheUserAvatar />
    </header>
  );
}
