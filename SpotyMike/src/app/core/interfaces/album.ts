import { Timestamp } from "firebase/firestore/lite";
import { IArtist } from "./artist";

export interface IAlbum {
    artistId: string;
    nom: string;
    cover: string;
    year: string;
    genre: string;
    visibility: boolean;
    label: string;
    createdAt: Timestamp;
}