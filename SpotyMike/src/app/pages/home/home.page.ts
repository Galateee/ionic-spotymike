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

  lastAlbum: any[] = [];
  lastAlbumSongsCount: number = 0;

  private fireStoreService = inject(FirestoreService);
  private router = inject(Router);
  
  constructor() {
    

  }
  
  ngOnInit() {
    addIcons({ arrowForwardOutline });
    this.loadLastAlbum();
  }
  
  async loadLastAlbum() {
    this.lastAlbum = await this.fireStoreService.getLastAlbum();
    console.log('Last album data :',this.lastAlbum);
    
    const songs = await this.fireStoreService.getSongsByAlbum(this.lastAlbum[0].id);  
    this.lastAlbumSongsCount = songs.length;
    console.log('Number of song in the last album :',this.lastAlbumSongsCount);
    
  }
  
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


