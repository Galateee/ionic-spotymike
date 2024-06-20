import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonApp, IonTabButton, IonCardContent, IonIcon, IonFooter, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonSegment, IonSegmentButton, IonList, IonItem, IonLabel, IonNote, IonThumbnail, IonRow, IonButtons, IonBackButton, IonButton, IonGrid, IonListHeader, IonCol, IonAvatar, IonImg } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ProfilePage } from '../profile/profile.page';
import { Router } from '@angular/router';
import { SongListComponent } from 'src/app/shared/components/song-list/song-list.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CardDisplayComponent } from 'src/app/shared/components/card-display/card-display.component';
import { SegmentComponent } from 'src/app/shared/components/segment/segment.component';
import { ListPlaylistComponent } from 'src/app/shared/components/list-playlist/list-playlist.component';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-home-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonImg, IonAvatar, IonCol, IonListHeader, IonGrid, IonButton, IonBackButton, IonButtons, IonRow, IonNote, IonLabel, IonItem, IonList, IonSegmentButton, IonSegment, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonFooter, IonIcon, IonCardContent, IonTabButton, IonApp,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonThumbnail,
    CommonModule,
    SongListComponent,
    HeaderComponent,
    CardDisplayComponent,
    SegmentComponent,
    ListPlaylistComponent,

  ],
})
export class HomePage {

  private albumService = inject(FirestoreService);
  constructor() {
    this.albumService.getAllUsers().then(usersList => {
      console.log('usersList result:', usersList);
    });
    this.albumService.getAllArtists().then(artistsList => {
      console.log('artistsList result:', artistsList);
    });
    this.albumService.getAllAlbums().then(albumsList => {
      console.log('albumsList result:', albumsList);
    });
    this.albumService.getAllSongs().then(songsList => {
      console.log('songsList result:', songsList);
    });
    this.albumService.getAllPlaylist().then(playlistsList => {
      console.log('playlistsList result:', playlistsList);
    }).catch(error => {
      console.error('Error:', error);
    });

    this.albumService.getAlbumsWithArtists().then(usersList => {
      console.log('Test Result:', usersList);
    });

  }
  ngOnInit() {
    addIcons({ arrowForwardOutline });
  }

  private router = inject(Router);

  likePage() {
    this.router.navigateByUrl('/home/like');
  }
  playlistPage() {
    this.router.navigateByUrl('/home/playlist');
  }
  profilePage() {
    this.router.navigateByUrl('/home/profile');
  }
  profileArtist() {
    this.router.navigateByUrl('/profile-artist');
  }
  listSongPage() {
    this.router.navigateByUrl('/list-song');
  }
  listArtistPage() {
    this.router.navigateByUrl('/list-artist');
  }
  playerSongPage() {
    this.router.navigateByUrl('/player-song');
  }
  searchPage() {
    this.router.navigateByUrl('/search');
  }
  albumPage() {
    this.router.navigateByUrl('/album');
  }

  selectedSegment: string = 'all';

  onSegmentChanged(val: string) {
    this.selectedSegment = val;
  }
}


