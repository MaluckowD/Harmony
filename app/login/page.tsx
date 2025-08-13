"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Music } from "lucide-react"
import Link from "next/link"
import * as z from "zod"
import { setCookie } from 'cookies-next'

import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Separator } from "@/shared/components/ui/separator"
import { loginApi } from "@/features/auth/api"
import { useStore } from "@/shared/store/store"

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Пароль должен содержать минимум 6 символов",
  }),
  password: z.string().min(6, {
    message: "Пароль должен содержать минимум 6 символов",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function LoginPage() {
  const setUserId = useStore((state) => state.setUserId)
  const setUserName = useStore((state) => state.setUserName)
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
  try {
    const response = await loginApi.login({
      username: values.username,
      password: values.password
    });
    
    if (response?.status === 200 || response?.status === 201) {
      localStorage.setItem('token', response.data.token);
      console.log(response.data.user.username)
      setUserName(response.data.user.username);
      setUserId(response.data.user.id);
    
      setCookie('token', response.data.token, {
        maxAge: 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
      });
      

      if (typeof window !== 'undefined') {

        router.push('/')
      }
    } else {
      throw new Error(response?.data?.message || "Неизвестная ошибка");
    }
  } catch (error) {
    console.error('Login error:', error);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Введите пароль"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Вход..." : "Войти"}
              </Button>
            </form>
          </Form>

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