import { Router } from '@angular/router';
import { Component, OnInit, Input, inject } from '@angular/core';
import { IonItem, IonList, IonThumbnail, IonLabel, IonNote, IonListHeader, IonButton, IonIcon, IonAlert, AlertController } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { ellipsisVertical, heartOutline, shareSocialOutline } from 'ionicons/icons';
import { AlertService } from 'src/app/core/services/alert.service';
@Component({
  selector: 'app-list-playlist',
  templateUrl: './list-playlist.component.html',
  styleUrls: ['./list-playlist.component.scss'],
  standalone: true,
  imports: [IonAlert, IonIcon, IonButton,
    IonItem,
    IonList,
    IonThumbnail,
    IonLabel,
    IonNote,
    IonListHeader,
    CommonModule,
  ],
})
export class ListPlaylistComponent  implements OnInit {

  @Input() hasHeader?: boolean;
  @Input() headerTitle?: string;
  @Input() hasGetAll?: boolean;

  private alert = inject(AlertService);

  constructor() { }

  ngOnInit(): void{
    addIcons({ ellipsisVertical, heartOutline, shareSocialOutline});
  }

  presentAlert(){
    this.alert.presentAlert();
  }

  private router = inject(Router);
  playerSongPage() {
    this.router.navigateByUrl('/list-song');
  }

  songs = [
    { title: 'Dusty Roads', artist: 'Jakob Press', songs: '39 songs' },
    { title: 'Golden Sunset', artist: 'Davis Calzoni', songs: '39 songs' },
    { title: 'Lost Soul', artist: 'Jaxon Bergson', songs: '39' },
    { title: 'Summer love', artist: 'Charlie Aminoff', songs: '39 songs' },
  ];
}
