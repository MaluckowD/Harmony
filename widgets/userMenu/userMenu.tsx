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
import { useStore } from '@/shared/store/store';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

export function UserMenu() {

    const [isAuth, setIsAuth] = useState(false);
    const userName = useStore((state) => state.userName)
    console.log(userName)

    // const token = localStorage.getItem("token")
    const token = getCookie('token');
    useEffect( () => {
        if (token) {
            setIsAuth(true)
        }
    }, [token])

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
                <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
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
                        <p className="text-sm font-medium leading-none">{userName}</p>
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