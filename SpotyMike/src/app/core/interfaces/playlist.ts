import { Timestamp } from "firebase/firestore/lite";

export interface IPlaylist {
    title: string;  
    creatorName: string;
    cover: string;  
    public: boolean;
    created_at: Timestamp
    updated_at: Timestamp;
}