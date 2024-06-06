import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItem,
    IonList,
    IonTitle,
    IonInput,
    IonHeader,
    IonButton,
    IonToolbar,
    IonContent,
    CommonModule,
  ],
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
