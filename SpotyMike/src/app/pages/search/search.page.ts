import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonApp } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonApp, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, HeaderComponent]
})
export class SearchPage {

  constructor() { }

}