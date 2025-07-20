import { create } from 'zustand'

export const useStore = create((set, get) => ({

    userData: null,
    albums: [],
    tracks: [],
    album: [],
    token: null,
    setAlbums: (newAlbums) => set({ albums: newAlbums }),
    setAlbum: (newAlbum) => set({ album: newAlbum }),
    setTracks: (newTracks) => set({ tracks: newTracks}),

}))

