'use client'
import * as React from "react"
import { Card, CardContent } from "@/shared/components/ui/card"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel"
import Link from "next/link";
import { Heart, Loader2, Play, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { TelegramIcon } from "@/shared/components/telegram-icon";
import { useStore } from "@/shared/store/store"
import { useAlbums } from "@/entities/albums/hooks/use-albums"
import { BASE_URL } from "@/shared/api/client"
import { useTracks } from "@/entities/tracks/hooks"
import { AudioPlayer } from "@/shared/components/AudioPlayer"
import { useUser } from "@/entities/user/hooks/use-user"
import { useAddFavoriteTrack } from "@/features/addFavoriteTrack/hooks"

export default function Home() {
  const { isLoading, error: albumsError } = useAlbums();
  const { data } = useUser()
  const albums = useStore((state) => state.albums)
  const tracks = useStore((state) => state.tracks)
  const openPlayer = useStore((state) => state.openPlayer)
  const isPlayerOpen = useStore((state) => state.isPlayerOpen)
  const { isLoading: loadingTracks, error } = useTracks();
  const setIsPlaying = useStore((state) => state.setIsPlaying)
  const audioUrl = useStore((state) => state.audioUrl)
  const setAudioUrl = useStore((state) => state.setAudioUrl)
  const isPlaying = useStore((state) => state.isPlaying)
  const setCurrentTrack = useStore((state) => state.setCurrentTrack)
  const { mutate: addToFavorites, isPending } = useAddFavoriteTrack()

  const handlePlayTrack = (track) => {
    const newAudioUrl = `${BASE_URL}songs/${track.filePath}`;
    
    if (newAudioUrl === audioUrl && isPlaying) {
      setIsPlaying(false);
      return;
    }
    
    if (newAudioUrl === audioUrl && !isPlaying) {
      setIsPlaying(true);
      return;
    }
    
    setAudioUrl(newAudioUrl);
    setCurrentTrack(track.title)
    openPlayer();
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-[family-name:var(--font-geist-sans)]">
      <div className="flex-grow p-8 pb-20 sm:p-20">
        <div className="relative">
          <h2 className="mb-10 text-3xl font-bold">Альбомы</h2>
          
          {isPlayerOpen && (
            <AudioPlayer src={audioUrl}/>
          )}
          
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <div className="relative">
              { isLoading ? (
                  <div className="flex h-20 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
              ) : albumsError ? (
                <div className="text-muted-foreground text-sm mb-1">Ошибка получения альбомов!</div>
              ) : (
                <CarouselContent className="-ml-4">
                {albums.map((album) => (
                  <CarouselItem
                    key={album.id} 
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <Card className="group h-full p-0">
                      <Link href={`/album/${album.id}`}>
                        <CardContent className="flex flex-col h-full p-0">
                          <div className="w-full flex-grow-0 relative">
                            <Image
                              src={`${BASE_URL}albumImages/${album.imagePath}`}
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
                            <h3 className="font-semibold text-lg mb-1 truncate">{album.title}</h3>
                            <p className="text-muted-foreground text-sm mb-1">{album.artistName}</p>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              )}

              { isLoading ? (
                  <div></div>
              ) : (
                <div className="absolute -top-12 right-0 flex gap-2 -mb-2">
                  <CarouselPrevious className="static cursor-pointer" />
                  <CarouselNext className="static cursor-pointer" />
              </div>
              )}
            </div>
          </Carousel>
        </div>

        <div className="relative mt-10">
          <h2 className="mb-10 text-3xl font-bold">Треки</h2>
          { loadingTracks ? (
                  <div className="flex h-20 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
              ) : error ? (
                <div className="text-muted-foreground text-sm mb-1">
                  Не удалось загрузить песни! Попробуйте позже!
                </div>
              ) : (
                <div className="space-y-2">
              {tracks.map((track) => (
                <Card key={track.id} className="group hover:bg-muted/50 transition-colors border-border/50">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-0 pl-4 pr-4">
                      <div className="text-muted-foreground text-sm w-6 text-center">{track.id}</div>
                      <div className="relative">
                        <Image
                          src={`${BASE_URL}songImages/${track.imagePath}`}
                          alt={"текст"}
                          width={60}
                          height={60}
                          className="rounded-md"
                        />
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          onClick={() => handlePlayTrack(track)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{track.title}</h4>
                        <p className="text-muted-foreground text-sm truncate">{track.artistName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost" className="cursor-pointer" onClick = { () => {
                          addToFavorites(track.id)
                        }}>
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="py-6 border-t">
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