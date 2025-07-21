import { create } from 'zustand'
import { iStore } from '../types/types'

export const useStore = create<iStore>((set, get) => ({

    userData: null,
    albums: [],
    tracks: [],
    album: [],
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
    audioRef: null,
    setAudioRef: (ref) => set({ audioRef: ref }),
}))

