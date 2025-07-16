"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Music } from "lucide-react"

export default function RegistrationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-sm m-0 mx-auto">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary rounded-full">
                    <Music className="h-8 w-8 text-primary-foreground" />
                    </div>
                </div>
                <CardTitle className="text-2xl">Создать аккаунт</CardTitle>
                <CardDescription>
                    Зарегистрируйтесь для доступа к музыке
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Email</Label>
                        <Input
                            id="name"
                            type="name"
                            placeholder="Ваше имя"
                            required
                        />
                    </div>
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
                        <Input id="password" type="password" placeholder="Введите пароль"required />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="сonfirmation-password">Подтвердите пароль</Label>
                        </div>
                        <Input id="сonfirmation-password"
                         type="password" required
                         placeholder="Повторите пароль" />
                    </div>
                    <Button type="submit" className="w-full">
                        Зарегистрироваться
                    </Button>
                </div>
                </form>

                <Separator className="my-6" />

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                    Уже есть аккаунт?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Войти
                    </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
