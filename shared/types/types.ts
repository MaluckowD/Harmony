export interface iSong  {
    id: string,
    title: string,
    artistName: string,
    albumTitle: string,
    filePath: string,
    imagePath: string
}



export interface iStore  {
    tracks: iSong[],
}