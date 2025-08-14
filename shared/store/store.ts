import { create } from 'zustand'
import { iStore } from '../types/types'

export const useStore = create<iStore>((set, get) => ({
    isAuth: false,
    setIsAuth: (value) => set({isAuth: value}),
    userData: null,
    userId: null,
    setUserId: (value) => set({ userId: value }),
    userName: "",
    setUserName: (value) => set({ userName: value }),
    albums: [],
    tracks: [],
    album: null,
    audioUrl: "",
    setAudioUrl: (value) => set({ audioUrl: value }),
    token: null,
    isPlayerOpen: false,
    currentTrack: "",
    setCurrentTrack: (value) => set({ currentTrack: value }),
    openPlayer: () => set({ isPlayerOpen: true }),
    closePlayer: () => set({ isPlayerOpen: false }),
    setAlbums: (newAlbums) => set({ albums: newAlbums }),
    setAlbum: (newAlbum) => set({ album: newAlbum }),
    setTracks: (newTracks) => set({ tracks: newTracks}),
    isPlaying: false,
    setIsPlaying: (value) => set({ isPlaying: value }),
    favoriteSongs: [],
    favoriteAlbums: [],
    setFavoritesSongs:  (value) => set({ favoriteSongs: value }),
    setFavoritesAlbums:  (value) => set({ favoriteAlbums: value }),
    authorData: null,
    setAuthorData: (value) => set({authorData: value})

}))

