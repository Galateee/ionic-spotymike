import { Router } from '@angular/router';
import { Component, OnInit, Input, inject } from '@angular/core';
import { IonListHeader, IonLabel, IonButton, IonRow, IonCol, IonCard, IonCardContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss'],
  standalone: true,
  imports: [ IonListHeader, IonLabel, IonButton, IonRow, IonCol, IonCard, IonCardContent, CommonModule,
  ],
})
export class CardDisplayComponent  implements OnInit {

  @Input() value?: string;
  @Input() headerTitle?: string;
  @Input() hasHeader?: boolean;
  @Input() hasGetAll?: boolean;

  data?: any[];

  constructor() { }

  ngOnInit() {
    this.setData();
  }

  setData() {
    switch (this.value) {
      case 'topSongs':
        this.data = this.topSongs;
        break;
      case 'topAlbums':
        this.data = this.topAlbums;
        break;
      case 'topArtists':
        this.data = this.topArtists;
        break;
      default:
        this.data = [];
    }
  }

  topSongs = [
    { title: 'Starry Skies', artist: 'Amelia Cantata' },
    { title: 'Sunset Serenity', artist: 'Olivia Lyric' },
    { title: 'Eternal Sunset', artist: 'Mason Chorus' },
  ];
  topAlbums = [
    { title: 'Starry Skies', artist: 'Amelia Cantata' },
    { title: 'Sunset Serenity', artist: 'Olivia Lyric' },
    { title: 'Eternal Sunset', artist: 'Mason Chorus' },
  ];
  topArtists = [
    { avatar: '' },
    { avatar: '' },
    { avatar: '' },
  ];

  private router = inject(Router);
  valuePage() {
    if (this.value === 'topSongs') {
      this.router.navigate(['/player-song']); // Redirect to /list-song for songs
    } else if (this.value === 'topAlbums') {
      this.router.navigate(['/album']); // Redirect to /list-album for albums
    } else if (this.value === 'topArtists') {
      this.router.navigate(['/profile-artist']); // Redirect to /list-artist for artists
    }
  }
}
