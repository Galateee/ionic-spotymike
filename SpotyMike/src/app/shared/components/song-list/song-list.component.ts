import { Component, OnInit, Input } from '@angular/core';
import { IonItem, IonList, IonThumbnail, IonLabel, IonNote, IonListHeader, IonButton, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { ellipsisHorizontal } from 'ionicons/icons';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton,
    IonItem,
    IonList,
    IonThumbnail,
    IonLabel,
    IonNote,
    IonListHeader,
    CommonModule,
  ],
})
export class SongListComponent  implements OnInit {

  @Input() hasHeader?: boolean;
  @Input() headerTitle?: string;
  @Input() hasGetAll?: boolean;

  constructor() { }

  ngOnInit() {
    addIcons({ ellipsisHorizontal});
  }

  songs = [
    { title: 'Dusty Roads', artist: 'Jakob Press', duration: '5:33' },
    { title: 'Golden Sunset', artist: 'Davis Calzoni', duration: '2:33' },
    { title: 'Lost Soul', artist: 'Jaxon Bergson', duration: '1:33' },
    { title: 'Summer love', artist: 'Charlie Aminoff', duration: '7:33' },
  ];
}
