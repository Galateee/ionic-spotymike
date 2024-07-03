import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonAlert,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  ellipsisVertical,
  heartOutline,
  shareSocialOutline,
} from 'ionicons/icons';
import { AlertService } from 'src/app/core/services/alert.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-list-playlist',
  templateUrl: './list-playlist.component.html',
  styleUrls: ['./list-playlist.component.scss'],
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
export class ListPlaylistComponent implements OnInit {
  @Input() value?: string;
  @Input() hasHeader?: boolean;
  @Input() headerTitle?: string;
  @Input() hasGetAll?: boolean;

  homePlaylist: any[] = [];
  allPlaylist: any[] = [];

  private fireStoreService = inject(FirestoreService);
  private router = inject(Router);

  private alert = inject(AlertService);

  constructor() {
    addIcons({
      ellipsisVertical,
      heartOutline,
      shareSocialOutline,
    });
  }

  ngOnInit(): void {
    this.loadPlaylist();
  }

  async loadPlaylist() {
    if (this.value === 'homePlaylist') {
      this.homePlaylist = await this.fireStoreService.getPlaylistsWithDetails(
        4
      );
      console.log('Playlist Home:', this.homePlaylist);
    }
    if (this.value === 'allPlaylist') {
      this.allPlaylist = await this.fireStoreService.getPlaylistsWithDetails();
      console.log('Playlist All :', this.allPlaylist);
    }
  }

  presentAlert() {
    this.alert.presentAlert();
  }

  playerSongPage() {
    this.router.navigateByUrl('/list-song');
  }
}
