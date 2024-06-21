import { Timestamp } from "firebase/firestore/lite";
type ERoleUser = 'user' | 'artist';

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  tel: string;
  active: boolean;
  sexe: number;
  created_at: Timestamp;
  updated_at: Timestamp;

  role: ERoleUser;
  isEmailVerified: boolean;
}

interface IAccessToken {
  token: string;
  expires: string | Date;
}

export interface IToken {
  access: IAccessToken;
  refresh: IAccessToken;
}
