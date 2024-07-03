import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore/lite';
import { environment } from '../../../environments/environment.prod';
import { IAlbum } from '../interfaces/album';
import { IArtist } from '../interfaces/artist';
import { IPlaylist } from '../interfaces/playlist';
import { ISong } from '../interfaces/song';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  constructor() {}

  async getCollectionData<T>(collectionName: string) {
    const colRef = collection(this.db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  async getDocumentData<T>(collectionName: string, docId: string) {
    const docRef = doc(this.db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  }

  // get users, artists, albums, songs and playlists
  async getAllUsers() {
    return this.getCollectionData<IUser>('users');
  }
  async getAllArtists() {
    return this.getCollectionData<IArtist>('artists');
  }
  async getAllAlbums() {
    return this.getCollectionData<IAlbum>('albums');
  }
  async getAllSongs() {
    return this.getCollectionData<ISong>('songs');
  }
  async getAllPlaylists() {
    return this.getCollectionData<IPlaylist>('playlists');
  }

  // get albums and corresponding artists
  async getAlbumsWithArtists() {
    const albums = await this.getAllAlbums();
    const albumsWithArtistsPromises = albums.map(async (album) => {
      const artist = album.artistId
        ? await this.getDocumentData<IArtist>('artists', album.artistId)
        : null;
      return {
        ...album,
        artist_name: artist ? artist.fullname : null,
      };
    });
    return Promise.all(albumsWithArtistsPromises);
  }

  // get last album with their songs count
  async getLastAlbum() {
    const albumsCol = collection(this.db, 'albums');
    const q = query(albumsCol, orderBy('created_at', 'desc'), limit(1));
    const albumSnapshot = await getDocs(q);
    const album = albumSnapshot.docs.map((doc) => ({
      id: doc.id,
      cover: doc.data()['cover'],
      nom: doc.data()['nom'],
    }));

    const albumWithDetailsPromises = album.map(async (album) => {
      const songCountQuery = query(
        collection(this.db, 'songs'),
        where('albumId', '==', album.id)
      );
      const songsSnapshot = await getDocs(songCountQuery);
      const songCount = songsSnapshot.size;
      return {
        id: album.id,
        cover: album.cover,
        nom: album.nom,
        songCount,
      };
    });

    return Promise.all(albumWithDetailsPromises);
  }

  // get top 3 songs with their artist's name ordered by listen
  async getTopSongsWithArtists() {
    const songsCol = collection(this.db, 'songs');
    const q = query(songsCol, orderBy('nbEcoutes', 'desc'), limit(3));
    const songsSnapshot = await getDocs(q);
    const songsList = songsSnapshot.docs.map((doc) => doc.data() as ISong);

    const songsWithArtistsPromises = songsList.map(async (song) => {
      const album = song.albumId
        ? await this.getDocumentData<IAlbum>('albums', song.albumId)
        : null;
      const artist = album?.artistId
        ? await this.getDocumentData<IArtist>('artists', album.artistId)
        : null;
      return {
        title: song.title,
        nbEcoutes: song.nbEcoutes,
        artist_name: artist ? artist.fullname : null,
      };
    });

    return Promise.all(songsWithArtistsPromises);
  }

  // get top 3 albums based on the total listens of their songs
  async getTopAlbumsWithArtists() {
    const songs = await this.getAllSongs();

    const albumListenCounts: { [key: string]: number } = {};
    songs.forEach((song) => {
      if (song.albumId) {
        albumListenCounts[song.albumId] =
          (albumListenCounts[song.albumId] || 0) + song.nbEcoutes;
      }
    });

    const sortedAlbums = Object.entries(albumListenCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const topAlbumsPromises = sortedAlbums.map(
      async ([albumId, totalListens]) => {
        const album = await this.getDocumentData<IAlbum>('albums', albumId);
        const artist = album?.artistId
          ? await this.getDocumentData<IArtist>('artists', album.artistId)
          : null;
        return album
          ? {
              id: albumId,
              album_name: album.nom,
              artist_name: artist ? artist.fullname : null,
              totalListens,
            }
          : null;
      }
    );

    return (await Promise.all(topAlbumsPromises)).filter(Boolean);
  }

  // get top 3 artists by number of followers
  async getTopArtistsByFollowers() {
    const artistsCol = collection(this.db, 'artists');
    const q = query(artistsCol, orderBy('followers', 'desc'), limit(3));
    const artistsSnapshot = await getDocs(q);
    return artistsSnapshot.docs.map((doc) => ({
      id: doc.id,
      fullname: doc.data()['fullname'],
      followers: doc.data()['followers'],
    }));
  }

  // get last played songs
  async getLastPlayedSongs(limitCount?: number) {
    const songsCol = collection(this.db, 'songs');
    const q = limitCount
      ? query(songsCol, orderBy('dateEcoute', 'desc'), limit(limitCount))
      : query(songsCol, orderBy('dateEcoute', 'desc'));
    const songsSnapshot = await getDocs(q);
    const songsList = songsSnapshot.docs.map((doc) => doc.data() as ISong);

    const songsWithArtistsPromises = songsList.map(async (song) => {
      const album = song.albumId
        ? await this.getDocumentData<IAlbum>('albums', song.albumId)
        : null;
      const artist = album?.artistId
        ? await this.getDocumentData<IArtist>('artists', album.artistId)
        : null;
      return {
        title: song.title,
        dateEcoute: song.dateEcoute,
        artist_name: artist ? artist.fullname : null,
      };
    });

    return Promise.all(songsWithArtistsPromises);
  }

  // get playlists with songs count and creator's name
  async getPlaylistsWithDetails(limitCount?: number) {
    const playlistsCol = collection(this.db, 'playlists');
    const q = limitCount
      ? query(playlistsCol, limit(limitCount))
      : query(playlistsCol);
    const playlistSnapshot = await getDocs(q);
    const playlists = playlistSnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data()['title'],
      userId: doc.data()['userId'],
    }));

    const playlistsWithDetailsPromises = playlists.map(async (playlist) => {
      const creator = await this.getDocumentData<IUser>('users', playlist.userId);
      const songCountQuery = query(
        collection(this.db, 'songs'),
        where('playlistId', '==', playlist.id)
      );
      const songsSnapshot = await getDocs(songCountQuery);
      const songCount = songsSnapshot.size;
      return {
        title: playlist.title,
        creatorName: creator ? `${creator.firstname} ${creator.lastname}` : 'Unknown',
        songCount,
      };
    });

    return Promise.all(playlistsWithDetailsPromises);
  }

  // get album details
  async getAlbumDetails(albumId: string) {
    const album = await this.getDocumentData<IAlbum>('albums', albumId);
    if (!album) {
      return null;
    }

    const artist = album.artistId ? await this.getDocumentData<IArtist>('artists', album.artistId) : null;

    const songsCol = collection(this.db, 'songs');
    const songQuery = query(songsCol, where('albumId', '==', albumId));
    const songSnapshot = await getDocs(songQuery);
    const songs = songSnapshot.docs.map((doc) => doc.data() as ISong);

    return {
      albumName: album.nom,
      artistName: artist ? artist.fullname : 'Unknown Artist',
      songs,
    };
  }
}
