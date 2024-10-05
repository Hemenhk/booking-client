

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
     
      <div className="w-full flex-1">
      
      </div>
      <TheUserAvatar />
    </header>
  );
}
