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
    this.albumService.getAlbums();
  }
  ngOnInit() {
    addIcons({ arrowForwardOutline });
  }
}


