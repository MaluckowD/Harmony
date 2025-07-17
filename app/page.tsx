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
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <h2 className="mb-10 mt-10 text-3xl font-bold">Популярные треки</h2>
      </div>
    </div>
  );
}