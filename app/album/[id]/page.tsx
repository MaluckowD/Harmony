'use client'

import type React from "react"

import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Heart, Loader2, Play, Plus } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/shared/components/ui/card"
import { useAlbum } from "@/features/getAlbum/hooks"
import { useStore } from "@/shared/store/store"
import { useParams } from "next/navigation"
import { BASE_URL } from "@/shared/api/client"
import { useUser } from "@/entities/user/hooks/use-user"
import { useAddFavoriteAlbums } from "@/features/addFavoriteAlbum/hooks"
import { useGetFavorites } from "@/features/getFavorite/hooks"

export default function AlbumPage() {

  const params = useParams();
  const albumId = params.id as string;
  const { data } = useUser()
  const { isLoading, isError, error } = useAlbum(albumId);
  const album = useStore((state) => state.album)
  const { data: favorites, refetch } = useGetFavorites()
  const { mutate: addToFavorites, isPending } = useAddFavoriteAlbums(albumId)

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
              src={`${BASE_URL}albumImages/${album.imagePath}`}
              alt={"тест"}
              width={300}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm text-muted-foreground mb-2">АЛЬБОМ</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{album.title}</h1>
            {/* <p className="text-muted-foreground mb-2">{"Для Игоря"}</p> */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <span className="font-medium">{album.artistName}</span>
              {/* <span>•</span>
              <span>{"2025"}</span> */}
              <span>•</span>
              {isLoading ? (<div></div>): (<span>{album.songs.length} треков</span>)}
            </div>
            <div className="flex items-center gap-4">
              <Button size="lg" onClick={() => handlePlayTrack(album)}>
                <Play className="h-5 w-5 mr-2" />
                Воспроизвести
              </Button>
              <Button size="lg" variant="outline" onClick={ () => {
                addToFavorites()
                refetch()
              }}>
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
                <div className="col-span-3 flex items-center">АЛЬБОМ</div>
                <div className="col-span-2 text-right">ИЗБРАННОЕ</div>
              </div>
            </div>
            { isLoading ? (
                <div className="flex h-20 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
              album.songs.map((item) => (
              <Card key={item.id} className="group hover:bg-muted/50 transition-colors p-0 pt-3 pb-3">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-0 pl-4 pr-4">
                    <div className="text-muted-foreground text-sm w-6 text-center">{item.id}</div>
                    <div className="relative">
                      <Image
                        src={`${BASE_URL}songImages/${item.imagePath}`}
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
                      <h4 className="font-medium truncate">{item.title}</h4>
                      <p className="text-muted-foreground text-sm truncate">{item.artistName}</p>
                    </div>
                    <p className="flex-1 flex items-center">{item.albumTitle}</p>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Plus className="h-4 w-4" />
                      </Button>
                      {/* <span className="text-muted-foreground text-sm w-12 text-right">{"1:89"}</span> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))

            ) } 
          </div>
      </div>
    </div>
  )
}
