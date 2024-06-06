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
import { SongListComponent } from 'src/app/components/song-list/song-list.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CardDisplayComponent } from 'src/app/components/card-display/card-display.component';

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
  ],
})
export class HomePage {

  constructor() { }

  ngOnInit() {
    addIcons({ arrowForwardOutline });
  }
}


