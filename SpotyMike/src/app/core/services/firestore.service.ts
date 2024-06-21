import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit,
  doc,
  getDoc,
  DocumentReference,
  orderBy,
} from 'firebase/firestore/lite';

import { IArtist } from '../interfaces/artist';
import { IAlbum } from '../interfaces/album';
import { ISong } from '../interfaces/song';

import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  constructor() {}

  // Get a list of cities from your database
  async getAlbums() {
    const albumsCol = collection(this.db, 'albums');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    return albumsList;
  }

  async getAlbums2() {
    const albumsCol = collection(this.db, 'albums');
    const q = query(
      albumsCol,
      where('artistId', '==', 'artist_id_1'),
      limit(3)
    );
    const albumsSnapshot = await getDocs(q);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    return albumsList;
  }

  // get all users
  async getAllUsers() {
    const albumsCol = collection(this.db, 'users');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    return albumsList;
  }

  // get all artist
  async getAllArtists() {
    const albumsCol = collection(this.db, 'artists');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    return albumsList;
  }

  // get all albums
  async getAllAlbums() {
    const albumsCol = collection(this.db, 'albums');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    return albumsList;
  }

  // get all songs
  async getAllSongs() {
    const albumsCol = collection(this.db, 'songs');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    return albumsList;
  }

  // get all playlists
  async getAllPlaylist() {
    const albumsCol = collection(this.db, 'playlists');
    const albumsSnapshot = await getDocs(albumsCol);
    const albumsList = albumsSnapshot.docs.map((doc) => doc.data());
    return albumsList;
  }

  // get albums and corresponding artists
    async getAlbumsWithArtists() {
      const albumsCol = collection(this.db, 'albums');
      const albumsSnapshot = await getDocs(albumsCol);
      const albumsList = albumsSnapshot.docs.map((doc) => ({
        artistId: doc.data()['artistId'],
        album_name: doc.data()['nom'],
      }));

      const artistsPromises = albumsList.map(async (album) => {
        if (album.artistId) {
          const artistDoc = await getDoc(doc(this.db, 'artists', album.artistId));
          return {
            ...album,
            artist_name: artistDoc.exists() ? artistDoc.data()['fullname'] : null,
          };
        } else {
          return {
            ...album,
            artist_name: null,
          };
        }
      });
      const albumsWithArtists = await Promise.all(artistsPromises);
      return albumsWithArtists;
    }

    // get last album
    async getLastAlbum() {
      const albumCol = collection(this.db, 'albums');
      const q = query(albumCol, orderBy('created_at', 'desc'), limit(1));
      const albumSnapshot = await getDocs(q);
      const albumList = albumSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      return albumList;
    }

    // get songs by 1 album
    async getSongsByAlbum(id: string) {
      const songsCol = collection(this.db,'songs');
      const q = query(songsCol, where('albumId', '==', id));
      const songsSnapshot = await getDocs(q);
      const songsList = songsSnapshot.docs.map((doc) => doc.data());
      return songsList;
    }
}
