import { Component, OnInit, Input, inject } from '@angular/core';
import {
  IonItem,
  IonList,
  IonThumbnail,
  IonLabel,
  IonNote,
  IonListHeader,
  IonButton,
  IonIcon,
  IonAlert,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { ellipsisHorizontal } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
  standalone: true,
  imports: [
    IonAlert,
    IonIcon,
    IonButton,
    IonItem,
    IonList,
    IonThumbnail,
    IonLabel,
    IonNote,
    IonListHeader,
    CommonModule,
  ],
})
export class SongListComponent implements OnInit {
  @Input() hasHeader?: boolean;
  @Input() headerTitle?: string;
  @Input() hasGetAll?: boolean;

  lastPlayedSongs: any[] = [];

  private fireStoreService = inject(FirestoreService);
  private router = inject(Router);

  private alert = inject(AlertService);

  constructor() {}

  ngOnInit() {
    addIcons({ ellipsisHorizontal });
    this.loadLastPlayedSongs();
  }

  async loadLastPlayedSongs() {
    this.lastPlayedSongs = await this.fireStoreService.getLastPlayedSongs();
    console.log('Last Played :',this.lastPlayedSongs);
  }

  presentAlert() {
    this.alert.presentAlert();
  }

  playerSongPage() {
    this.router.navigateByUrl('/player-song');
  }
  searchPage() {
    this.router.navigateByUrl('/search');
  }

}
