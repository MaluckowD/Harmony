import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";
import { Heart, Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TelegramIcon } from "@/components/telegram-icon";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="relative">
        <h2 className="mb-10 text-3xl font-bold">Альбомы</h2>
        
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <div className="relative">
            <CarouselContent className="-ml-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <Card className="group h-full p-0">
                    <Link href={`/album/${index}`}>
                      <CardContent className="flex flex-col h-full p-0">
                        <div className="w-full flex-grow-0 relative">
                          <Image
                            src={"/image.png"}
                            alt={"текст"}
                            width={700}
                            height={600}
                            className="rounded-md w-full h-auto object-cover transition-all duration-300 hover:brightness-75"
                            style={{ aspectRatio: '1/1' }}
                          />
                          <Button
                            size="icon"
                            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="p-4 flex-grow">
                          <h3 className="font-semibold text-lg mb-1 truncate">Название альбома</h3>
                          <p className="text-muted-foreground text-sm mb-1">{"Автор"}</p>
                          {true && <p className="text-muted-foreground text-xs">{"2023"}</p>}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="absolute -top-12 right-0 flex gap-2 -mb-2">
              <CarouselPrevious className="static cursor-pointer" />
              <CarouselNext className="static cursor-pointer" />
            </div>
          </div>
        </Carousel>

      </div>


      <div className="relative">
        <h2 className="mb-10 mt-10 text-3xl font-bold">Треки</h2>
        <div className="space-y-2">
            {Array.from({ length: 6 }).map((track, index) => (
              <Card key={index} className="group hover:bg-muted/50 transition-colors border-border/50">
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
      <footer className="mt-20">
        <div className="container mx-auto flex flex-col items-center space-y-4 px-4 text-center">
          <div className="text-gray-500 dark:text-gray-400">
            © 2025 Harmony. Все права защищены.
          </div>
          <div className="max-w-md text-gray-500 dark:text-gray-400">
            Это приложение никак не связано с YouTube Music и не является их продуктом.
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Link
              href="https://t.me/l1nehalt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <TelegramIcon />
              l1nehalt
            </Link>
            <Link
              href="https://t.me/MaluckowD"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <TelegramIcon />
              MaluckowD
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}