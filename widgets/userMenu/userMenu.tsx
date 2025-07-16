'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function UserMenu() {

  const [isAuth, setIsAuth] = useState(false);

//   useEffect(() => {
//     setIsAuth(isAuthenticated);
//   }, [isAuthenticated]);

  if (!isAuth) {
    return (
      <Button size="sm" asChild>
        <Link href="/auth/login">Войти</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">hfh</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            Профиль
          </Link>
        </DropdownMenuItem>
        {/* <Logout /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}