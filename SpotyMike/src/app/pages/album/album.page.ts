import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonApp,
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  heartOutline,
  pauseCircle,
  playCircle,
  playOutline,
  shareSocialOutline,
} from 'ionicons/icons';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SongListComponent } from 'src/app/shared/components/song-list/song-list.component';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

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

  constructor(private route: ActivatedRoute) {
    addIcons({
      heartOutline,
      playOutline,
      shareSocialOutline,
      playCircle,
      pauseCircle,
    });
  }

  async ngOnInit() {
    const albumId = this.route.snapshot.paramMap.get('id');
    if (albumId) {
      this.albumDetail = await this.fireStoreService.getAlbumDetails(albumId);
      console.log(`Album '${this.albumDetail.albumName}' details :`, this.albumDetail);
    }
  }
}
