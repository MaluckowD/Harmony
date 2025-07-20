'use client';

import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
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
        <Link href="/login">
            <Button className='cursor-pointer' variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Войти
            </Button>
        </Link>
    );
  }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>
                            <User className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
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