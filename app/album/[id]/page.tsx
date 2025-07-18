import type React from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Heart, Play, Plus } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AlbumPage() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="relative">
        <Link href="/">
          <Button variant="ghost" className="mb-6 cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-shrink-0">
            <Image
              src={"/placeholder.svg"}
              alt={"тест"}
              width={300}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm text-muted-foreground mb-2">АЛЬБОМ</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{"альбом"}</h1>
            <p className="text-muted-foreground mb-2">{"Для Игоря"}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <span className="font-medium">{"Игорь Чесных"}</span>
              <span>•</span>
              <span>{"2025"}</span>
              <span>•</span>
              <span>{"5"} треков</span>
            </div>
            <div className="flex items-center gap-4">
              <Button size="lg">
                <Play className="h-5 w-5 mr-2" />
                Воспроизвести
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5 mr-2" />В избранное
              </Button>
            </div>
          </div>

          
          
        </div>

        <div className="space-y-2 border-border/50">
            <div className="border-border/50 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-sm text-muted-foreground">
                <div className="col-span-1">#</div>
                <div className="col-span-6">НАЗВАНИЕ</div>
                <div className="col-span-3">АЛЬБОМ</div>
                <div className="col-span-2 text-right">ВРЕМЯ</div>
              </div>
            </div>
            {Array.from({ length: 6 }).map((track, index) => (
              <Card key={index} className="group hover:bg-muted/50 transition-colors">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-0 pl-4 pr-4">
                    <div className="text-muted-foreground text-sm w-6 text-center">{index + 1}</div>
                    <div className="relative">
                      <Image
                        src={"next.svg"}
                        alt={"текст"}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        // onClick={() => handlePlayTrack(track)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{"Реал Мадрид"}</h4>
                      <p className="text-muted-foreground text-sm truncate">{"Поэт"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="text-muted-foreground text-sm w-12 text-right">{"1:89"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
      </div>
    </div>
  )
}
