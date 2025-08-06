'use client'

import type React from "react"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Heart, Loader2, Play, Plus, Users } from 'lucide-react'
import Image from "next/image"
import { Card, CardContent } from "@/shared/components/ui/card"
import { useParams } from "next/navigation"
import { useUser } from "@/entities/user/hooks/use-user"

interface Song {
  id: number
  title: string
  artistName: string
  albumTitle: string
  imagePath: string
  duration?: string
}

interface Album {
  id: number
  title: string
  imagePath: string
  year: number
  songsCount: number
}

interface Artist {
  id: number
  name: string
  imagePath: string
  bio?: string
  followers: number
  monthlyListeners: number
  albums: Album[]
  popularSongs: Song[]
}

const mockArtist: Artist = {
  id: 1,
  name: "Артист Примеров",
  imagePath: "artist1.jpg",
  bio: "Популярный исполнитель современной музыки",
  followers: 1250000,
  monthlyListeners: 2800000,
  albums: [
    { id: 1, title: "Первый альбом", imagePath: "album1.jpg", year: 2023, songsCount: 12 },
    { id: 2, title: "Второй альбом", imagePath: "album2.jpg", year: 2024, songsCount: 10 },
    { id: 3, title: "Третий альбом", imagePath: "album3.jpg", year: 2024, songsCount: 8 }
  ],
  popularSongs: [
    { id: 1, title: "Популярная песня 1", artistName: "Артист Примеров", albumTitle: "Первый альбом", imagePath: "song1.jpg", duration: "3:45" },
    { id: 2, title: "Популярная песня 2", artistName: "Артист Примеров", albumTitle: "Второй альбом", imagePath: "song2.jpg", duration: "4:12" },
    { id: 3, title: "Популярная песня 3", artistName: "Артист Примеров", albumTitle: "Первый альбом", imagePath: "song3.jpg", duration: "3:28" },
    { id: 4, title: "Популярная песня 4", artistName: "Артист Примеров", albumTitle: "Третий альбом", imagePath: "song4.jpg", duration: "5:01" },
    { id: 5, title: "Популярная песня 5", artistName: "Артист Примеров", albumTitle: "Второй альбом", imagePath: "song5.jpg", duration: "3:55" }
  ]
}

export default function ArtistPage() {
  const params = useParams()
  const artistId = params.id as string
  const { data: user } = useUser()
  
  const isLoading = false
  const artist = mockArtist

  const handlePlayArtist = () => {
    console.log('Playing artist:', artist.name)
  }

  const handleFollowArtist = () => {
    console.log('Following artist:', artist.name)
  }

  const handlePlaySong = (song: Song) => {
    console.log('Playing song:', song.title)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K'
    }
    return num.toString()
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

        {/* Информация об артисте */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-shrink-0">
            <Image
              src={`/placeholder.svg?height=300&width=300&text=${artist.name}`}
              alt={artist.name}
              width={300}
              height={300}
              className="rounded-full shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm text-muted-foreground mb-2">АРТИСТ</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{artist.name}</h1>
            {artist.bio && (
              <p className="text-muted-foreground mb-4 max-w-2xl">{artist.bio}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{formatNumber(artist.followers)} подписчиков</span>
              </div>
              <span>•</span>
              <span>{formatNumber(artist.monthlyListeners)} слушателей в месяц</span>
            </div>
            <div className="flex items-center gap-4">
              <Button size="lg" onClick={handlePlayArtist}>
                <Play className="h-5 w-5 mr-2" />
                Воспроизвести
              </Button>
              <Button size="lg" variant="outline" onClick={handleFollowArtist}>
                <Heart className="h-5 w-5 mr-2" />
                Подписаться
              </Button>
            </div>
          </div>
        </div>

        {/* Популярные треки */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Популярные треки</h2>
          <div className="space-y-2">
            <div className="border-border/50 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-sm text-muted-foreground">
                <div className="col-span-1">#</div>
                <div className="col-span-6">НАЗВАНИЕ</div>
                <div className="col-span-3">АЛЬБОМ</div>
                <div className="col-span-2 text-right">ДЛИТЕЛЬНОСТЬ</div>
              </div>
            </div>
            {artist.popularSongs.map((song, index) => (
              <Card key={song.id} className="group hover:bg-muted/50 transition-colors p-0 pt-3 pb-3">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-0 pl-4 pr-4">
                    <div className="text-muted-foreground text-sm w-6 text-center">
                      {index + 1}
                    </div>
                    <div className="relative">
                      <Image
                        src={`/placeholder.svg?height=60&width=60&text=Song${song.id}`}
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
                      <Button size="icon" variant="ghost">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="text-muted-foreground text-sm w-12 text-right">
                        {song.duration}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Альбомы */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Альбомы</h2>
            <Button variant="ghost" className="text-muted-foreground">
              Показать все
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {artist.albums.map((album) => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <Card className="group hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <Image
                        src={`/placeholder.svg?height=200&width=200&text=${album.title}`}
                        alt={album.title}
                        width={200}
                        height={200}
                        className="rounded-md w-full aspect-square object-cover"
                      />
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        onClick={(e) => {
                          e.preventDefault()
                          console.log('Playing album:', album.title)
                        }}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-medium truncate mb-1">{album.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {album.year} • {album.songsCount} треков
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
