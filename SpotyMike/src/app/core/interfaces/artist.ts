import { Timestamp } from "firebase/firestore/lite";
import { IUser } from "./user";

export interface IArtist {
    userId: IUser[];
    fullname: string;
    label: string;
    description?: string;
    avatar: string;
    followers?: number;
    createdAt: Timestamp;
}