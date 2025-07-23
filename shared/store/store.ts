import { create } from 'zustand'
import { iStore } from '../types/types'

export const useStore = create<iStore>((set, get) => ({
    userData: null,
    userId: -1,
    setUserId: (value) => set({ userId: value }),
    userName: "",
    setUserName: (value) => set({ userName: value }),
    albums: [],
    tracks: [],
    album: [],
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
}))

