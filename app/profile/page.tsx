import { Heart, Play, Plus } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
} from "@/shared/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components/ui/carousel"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="relative">
            <h2 className="mb-3 mt-0 text-3xl font-bold">Ваш профиль</h2>
            <p className="text-muted-foreground mb-5">Ваши любимые альбомы и треки</p>
            <Tabs defaultValue="account">
                <TabsList className="h-10 items-center mb-10 justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger className="cursor-pointer" value="account">Альбомы</TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="password">Треки</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
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
                </TabsContent>
                <TabsContent value="password">
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
                            
                </TabsContent>
            </Tabs>
      </div>
    </div>
  )
}
