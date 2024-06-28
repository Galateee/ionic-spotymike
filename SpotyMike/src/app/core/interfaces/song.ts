import { Timestamp } from "firebase/firestore/lite";
import { IAlbum } from "./album";

export interface ISong {
    title: string;
    cover: string;
    albumId: string;
    nbEcoutes: number;
    dateEcoute: Timestamp;
}