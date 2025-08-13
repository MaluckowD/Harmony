'use client'

import type React from "react"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Heart, Loader2, Play } from 'lucide-react'
import Image from "next/image"
import { Card, CardContent } from "@/shared/components/ui/card"
import { useParams } from "next/navigation"
import { useUser } from "@/entities/user/hooks/use-user"
import { useGetAuthor } from "@/features/getAuthor/hooks"
import { useStore } from "@/shared/store/store"
import { BASE_URL } from "@/shared/api/client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components/ui/carousel"


export default function ArtistPage() {
  const params = useParams()
  const artistId = params.id as string
  const { data: user } = useUser()
  const { isLoading, isError, error } = useGetAuthor(artistId);
  const authorData = useStore((state) => state.authorData)
  console.log("author", authorData)

  const handlePlayArtist = () => {
    console.log('Playing artist:')
  }

  const handlePlaySong = (song) => {
    console.log('Playing song:', song.title)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="relative">
        <Link href="/">
          <Button variant="ghost" className="mb-6 cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-shrink-0">
            <Image
              src={authorData?.imagePath ? `${BASE_URL}artistImages/${authorData?.imagePath}` : '/artist.webp'}
              alt={""}
              width={300}
              height={300}
              className="rounded-full shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm text-muted-foreground mb-2">АРТИСТ</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{authorData?.name}</h1>
            <div className="flex items-center gap-4">
              <Button size="lg" onClick={handlePlayArtist}>
                <Play className="h-5 w-5 mr-2" />
                Воспроизвести
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Треки</h2>
          <div className="space-y-2">
            <div className="border-border/50 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-sm text-muted-foreground">
                <div className="col-span-1">#</div>
                <div className="col-span-6">НАЗВАНИЕ</div>
                <div className="col-span-3">АЛЬБОМ</div>
              </div>
            </div>
            {authorData?.songs.map((song, index) => (
              <Card key={song.id} className="group hover:bg-muted/50 transition-colors p-0 pt-3 pb-3">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-0 pl-4 pr-4">
                    <div className="text-muted-foreground text-sm w-6 text-center">
                      {index + 1}
                    </div>
                    <div className="relative">
                      <Image
                        src={song.imagePath ? `${BASE_URL}songImages/${song.imagePath}` : '/track.svg'}
                        alt={song.title}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handlePlaySong(song)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{song.title}</h4>
                      <p className="text-muted-foreground text-sm truncate">{song.artistName}</p>
                    </div>
                    <p className="flex-1 flex items-center text-muted-foreground text-sm">
                      {song.albumTitle}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Альбомы */}
        {authorData?.albums && authorData.albums.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Альбомы</h2>
            </div>
            
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <div className="relative">
                <CarouselContent className="-ml-4">
                  {authorData.albums.map((album) => (
                    <CarouselItem
                      key={album.id} 
                      className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                    >
                      <Card className="group h-full">
                        <Link href={`/album/${album.id}`}>
                          <CardContent className="flex flex-col aspect-square p-0">
                            <div className="relative flex-1">
                              <Image
                                src={`${BASE_URL}albumImages/${album.imagePath}`}
                                alt={album.title}
                                width={400}
                                height={400}
                                className="rounded-t-md w-full h-full object-cover transition-all duration-300 hover:brightness-75"
                              />
                              <Button
                                size="icon"
                                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-lg mb-1 truncate">{album.title}</h3>
                              <p className="text-muted-foreground text-sm">{album.artistName}</p>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="absolute -top-12 right-0 flex gap-2">
                  <CarouselPrevious className="static cursor-pointer" />
                  <CarouselNext className="static cursor-pointer" />
                </div>
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  )
}
