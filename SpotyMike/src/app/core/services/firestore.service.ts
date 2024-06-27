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

  // get top 3 songs with their artist's name ordered by listen
  async getTopSongsWithArtists() {
    const songsCol = collection(this.db, 'songs');
    const q = query(songsCol, orderBy('nbEcoutes', 'desc'), limit(3));
    const songsSnapshot = await getDocs(q);
    const songsList = songsSnapshot.docs.map((doc) => doc.data()) as ISong[];

    const songsWithArtistsPromises = songsList.map(async (song) => {
      if (song.albumId) {
        const albumDoc = await getDoc(doc(this.db, 'albums', song.albumId));
        if (albumDoc.exists()) {
          const albumData = albumDoc.data();
          const artistDoc = await getDoc(doc(this.db, 'artists', albumData['artistId']));
          return {
            title: song['title'],
            nbEcoutes: song['nbEcoutes'],
            artist_name: artistDoc.exists() ? artistDoc.data()['fullname'] : null,
          };
        } else {
          return {
            title: song['title'],
            nbEcoutes: song['nbEcoutes'],
            artist_name: null,
          };
        }
      } else {
        return {
          title: song['title'],
          nbEcoutes: song['nbEcoutes'],
          artist_name: null,
        };
      }
    });

    const songsWithArtists = await Promise.all(songsWithArtistsPromises);
    return songsWithArtists;
  }

  // get top 3 albums based on the total listens of their songs
  async getTopAlbumsWithArtists() {
    const songsCol = collection(this.db, 'songs');
    const songsSnapshot = await getDocs(songsCol);
    const songsList = songsSnapshot.docs.map((doc) => doc.data()) as ISong[];

    // Group songs by albumId and calculate total listens for each album
    const albumListenCounts: { [key: string]: number } = {};
    songsList.forEach((song) => {
      if (song.albumId) {
        if (!albumListenCounts[song.albumId]) {
          albumListenCounts[song.albumId] = 0;
        }
        albumListenCounts[song.albumId] += song.nbEcoutes;
      }
    });

    // Convert the object to an array of [albumId, totalListens] and sort it
    const sortedAlbums = Object.entries(albumListenCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    // Fetch album and artist details
    const topAlbumsPromises = sortedAlbums.map(async ([albumId, totalListens]) => {
      const albumDoc = await getDoc(doc(this.db, 'albums', albumId));
      if (albumDoc.exists()) {
        const albumData = albumDoc.data();
        const artistDoc = await getDoc(doc(this.db, 'artists', albumData['artistId']));
        return {
          album_name: albumData['nom'],
          artist_name: artistDoc.exists() ? artistDoc.data()['fullname'] : null,
          totalListens,
        };
      } else {
        return null;
      }
    });

    const topAlbums = (await Promise.all(topAlbumsPromises)).filter((album) => album !== null);
    return topAlbums;
  }

  // get top 3 artists by number of followers
  async getTopArtistsByFollowers() {
    const artistsCol = collection(this.db, 'artists');
    const q = query(artistsCol, orderBy('followers', 'desc'), limit(3));
    const artistsSnapshot = await getDocs(q);
    const artistsList = artistsSnapshot.docs.map((doc) => ({
      fullname: doc.data()['fullname'],
      followers: doc.data()['followers'],
    }));
    return artistsList;
  }
}
