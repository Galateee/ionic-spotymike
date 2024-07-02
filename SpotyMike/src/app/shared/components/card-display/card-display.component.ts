import { Router } from '@angular/router';
import { Component, OnInit, Input, inject } from '@angular/core';
import { IonListHeader, IonLabel, IonButton, IonRow, IonCol, IonCard, IonCardContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FirestoreService } from 'src/app/core/services/firestore.service';

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

  topSongs: any[] = []; 
  topAlbums: any[] = []; 
  topArtists: any[] = []; 
  
  private router = inject(Router);
  private fireStoreService = inject(FirestoreService);

  constructor() { }

  ngOnInit() {

    this.loadTop();
  }

  async loadTop() {
    if (this.value == "topSongs") {
      this.topSongs = await this.fireStoreService.getTopSongsWithArtists();
      console.log('Top 3 songs (all):',this.topSongs);
    }
    if (this.value == "topAlbums") {
      this.topAlbums = await this.fireStoreService.getTopAlbumsWithArtists();
      console.log('Top 3 albums (all):',this.topAlbums);
    }
    if (this.value == "topArtists") {
      this.topArtists = await this.fireStoreService.getTopArtistsByFollowers();
      console.log('Top 3 artists (all):',this.topArtists);
    }
  }

  goToPlayer() {
    this.router.navigateByUrl('/player-song');
  }
  goToAlbumPage(albumId: string): void {
    this.router.navigate(['/album', albumId]);
  }
  goToArtistPage(artistId: string): void {
    this.router.navigate(['/profile-artist', artistId]);
  }
}
