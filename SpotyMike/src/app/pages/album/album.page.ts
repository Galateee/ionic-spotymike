import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonApp,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonAvatar,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { addIcons } from 'ionicons';
import {
  heartOutline,
  playOutline,
  shareSocialOutline,
  playCircle,
  pauseCircle,
} from 'ionicons/icons';
import { SongListComponent } from 'src/app/shared/components/song-list/song-list.component';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { Router } from '@angular/router';
import { IAlbum } from 'src/app/core/interfaces/album'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ExploreContainerComponent,
    HeaderComponent,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonAvatar,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonRow,
    IonCol,
    SongListComponent,
  ],
})
export class AlbumPage implements OnInit {
  isPlaying: boolean = false;
  albumDetail: any = null;

  private fireStoreService = inject(FirestoreService);
  private router = inject(Router);

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    addIcons({ heartOutline, playOutline, shareSocialOutline, playCircle, pauseCircle });

    const albumId = this.route.snapshot.paramMap.get('id');
    if (albumId) {
      this.albumDetail = await this.fireStoreService.getAlbumDetails(albumId);
      console.log("Album details :",this.albumDetail);
    }
  }
}