import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{index + 1}</span>
                    </CardContent>
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
    </div>
  );
}