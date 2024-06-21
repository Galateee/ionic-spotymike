import { Timestamp } from "firebase/firestore/lite";
import { IArtist } from "./artist";

export interface IAlbum {
    artistId: IArtist[];
    nom: string;
    cover: string;
    year: string;
    genre: string;
    visibility: boolean;
    label: string;
    createdAt: Timestamp;
}