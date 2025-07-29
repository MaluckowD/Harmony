export interface iSong  {
    id: string,
    title: string,
    artistName: string,
    albumTitle: string,
    filePath: string,
    imagePath: string
}



export interface iStore  {
    userData: null,
    tracks: iSong[],
    userId: number | null,
    userName: string,
    audioUrl: string,
    token: null | string,
    isPlayerOpen: boolean,
    currentTrack: string,
    isPlaying: boolean,
    setUserId: (value: number) => void,
    setUserName: (value: string) => void,
    setAudioUrl: (value: string) => void,
    setCurrentTrack: (value: string) => void,
    openPlayer: () => void,
    closePlayer: () => void,
    setIsPlaying: (value: boolean) => void,
}




    albums: [],
    tracks: [],
    album: []
    setAlbums: (newAlbums) => set({ albums: newAlbums }),
    setAlbum: (newAlbum) => set({ album: newAlbum }),
    setTracks: (newTracks) => set({ tracks: newTracks}),