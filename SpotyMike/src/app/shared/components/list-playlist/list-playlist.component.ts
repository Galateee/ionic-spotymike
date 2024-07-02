import { Router } from '@angular/router';
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

  constructor() {}

  ngOnInit(): void {
    addIcons({ ellipsisVertical, heartOutline, shareSocialOutline });
    this.loadPlaylist();
  }

  async loadPlaylist() {

    if(this.value === "homePlaylist") {
      this.homePlaylist = await this.fireStoreService.getPlaylistsWithDetails(4)
      console.log('Last Played :',this.homePlaylist);
    }
    if(this.value === "allPlaylist") {
      this.allPlaylist = await this.fireStoreService.getPlaylistsWithDetails()
      console.log('List song :',this.allPlaylist);
    }
  }

  presentAlert() {
    this.alert.presentAlert();
  }

  playerSongPage() {
    this.router.navigateByUrl('/list-song');
  }

}
