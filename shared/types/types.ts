export interface iSong  {
    id: string,
    title: string,
    artistName: string,
    albumTitle: string,
    filePath: string,
    imagePath: string
}

export interface iAlbum  {
    id: string,
    title: string,
    artistName: string,
    imagePath: string,
    songs: iSong[],
    ////
}



export interface iStore  {
    userData: null,
    tracks: iSong[],
    userId: number | null,
    album: iAlbum | null;
    albums: iAlbum[],
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
    setAlbum: (newAlbum: iAlbum) => void,
    setAlbums: (newAlbums: iAlbum[]) => void,
    setTracks: (newTracks: iSong[]) => void,
    favoriteSongs: iSong[],
    favoriteAlbums: iAlbum[],
    setFavoritesSongs:  (value: iSong[]) => void,
    setFavoritesAlbums:  (value: iAlbum[]) => void,
}