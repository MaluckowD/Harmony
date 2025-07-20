"use client"

import type React from "react"

import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import Link from "next/link"
import { Separator } from "@/shared/components/ui/separator"
import { Music } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-sm m-0 mx-auto">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary rounded-full">
                    <Music className="h-8 w-8 text-primary-foreground" />
                    </div>
                </div>
                <CardTitle className="text-2xl">Добро пожаловать</CardTitle>
                <CardDescription>
                Войдите в свой аккаунт для доступа к музыке
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                    </div>
                    <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Пароль</Label>
                    </div>
                    <Input id="password" type="password" placeholder="Введите пароль" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Войти
                    </Button>
                </div>
                </form>

                <Separator className="my-6" />

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                    Нет аккаунта?{" "}
                    <Link href="/register" className="text-primary hover:underline">
                        Зарегистрироваться
                    </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
