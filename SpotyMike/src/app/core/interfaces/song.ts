import { IAlbum } from "./album";

export interface ISong {
    title: string;
    cover: string;
    albumId: IAlbum[];
    nbEcoutes?: number;
}