import { Component } from '@angular/core';
import { IonApp, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-like',
  templateUrl: 'like.page.html',
  styleUrls: ['like.page.scss'],
  standalone: true,
  imports: [IonApp, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, HeaderComponent, ]
})
export class LikePage {

  constructor() {}

}
