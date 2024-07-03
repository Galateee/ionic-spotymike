import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonApp, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.page.html',
  styleUrls: ['./list-artist.page.scss'],
  standalone: true,
  imports: [IonApp, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule , ExploreContainerComponent, HeaderComponent]
})
export class ListArtistPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
