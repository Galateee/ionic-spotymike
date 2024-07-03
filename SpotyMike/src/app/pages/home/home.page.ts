import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonApp,
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTabButton,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { CardDisplayComponent } from 'src/app/shared/components/card-display/card-display.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ListPlaylistComponent } from 'src/app/shared/components/list-playlist/list-playlist.component';
import { SegmentComponent } from 'src/app/shared/components/segment/segment.component';
import { SongListComponent } from 'src/app/shared/components/song-list/song-list.component';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-home-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonAvatar,
    IonCol,
    IonListHeader,
    IonGrid,
    IonButton,
    IonBackButton,
    IonButtons,
    IonRow,
    IonNote,
    IonLabel,
    IonItem,
    IonList,
    IonSegmentButton,
    IonSegment,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonFooter,
    IonIcon,
    IonCardContent,
    IonTabButton,
    IonApp,
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

  // getTest: any[] = [];

  private fireStoreService = inject(FirestoreService);
  private router = inject(Router);

  constructor() {
    addIcons({
      arrowForwardOutline,
    });
  }

  ngOnInit() {
    this.loadLastAlbum();
    // this.loadTestFirestore();
  }

  async loadLastAlbum() {
    this.lastAlbum = await this.fireStoreService.getLastAlbum();
    console.log('Last album :', this.lastAlbum);
  }

  // async loadTestFirestore() {
  //   this.getTest = await this.fireStoreService.getAlbumsWithArtists();
  //   console.log('TEST data :',this.getTest);
  //   this.getAllArtists = await this.fireStoreService.getAllArtists();
  //   console.log('All artists data :',this.getAllArtists);
  //   this.getAlbums = await this.fireStoreService.getAlbums();
  //   console.log('All albums data :',this.getAlbums);
  //   this.getAllSongs = await this.fireStoreService.getAllSongs();
  //   console.log('All songs data :',this.getAllSongs);
  //   this.getAllPlaylists = await this.fireStoreService.getAllPlaylists();
  //   console.log('All playlists data :',this.getAllPlaylists);
  // }

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
  goToAlbumPage(albumId: string): void {
    this.router.navigate(['/album', albumId]);
  }

  selectedSegment: string = 'all';
  onSegmentChanged(val: string) {
    this.selectedSegment = val;
  }
}
