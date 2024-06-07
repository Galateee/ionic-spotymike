import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonApp } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.page.html',
  styleUrls: ['./list-song.page.scss'],
  standalone: true,
  imports: [IonApp, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, ExploreContainerComponent]
})
export class ListSongPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
