import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonApp, IonTabButton, IonCardContent, IonIcon, IonFooter, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonSegment, IonSegmentButton, IonList, IonItem, IonLabel, IonNote, IonThumbnail, IonRow, IonButtons, IonBackButton, IonButton, IonGrid, IonListHeader, IonCol } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ProfilePage } from '../profile/profile.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCol, IonListHeader, IonGrid, IonButton, IonBackButton, IonButtons, IonRow, IonNote, IonLabel, IonItem, IonList, IonSegmentButton, IonSegment, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonFooter, IonIcon, IonCardContent, IonTabButton, IonApp,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonThumbnail,
    CommonModule,
  ],
})
export class HomePage {

  private router = inject(Router);

  constructor() {
    addIcons({ searchOutline});
  }

  topSongs = [
    { title: 'Starry Skies', artist: 'Amelia Cantata' },
    { title: 'Sunset Serenity', artist: 'Olivia Lyric' },
    { title: 'Eternal Sunset', artist: 'Mason Chorus' },
  ];

  lastPlayed = [
    { title: 'Dusty Roads', artist: 'Jakob Press', duration: '5:33' },
    { title: 'Golden Sunset', artist: 'Davis Calzoni', duration: '2:33' },
    { title: 'Lost Soul', artist: 'Jaxon Bergson', duration: '1:33' },
    { title: 'Summer Love', artist: 'Charlie Aminoff', duration: '7:33' },
  ];

  profilePage() {
    this.router.navigateByUrl('/home/profile');
  }
}


