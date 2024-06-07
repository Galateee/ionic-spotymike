import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FirestoreService } from '../services/firestore.service';
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
  IonLabel,
  IonAvatar,
  IonCol,
  IonRow,
  IonGrid,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonAvatar,
    IonLabel,
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
  userInfo: any = {};

 // constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
   // const userId = 'USER_ID'; 
    //this.firestoreService.getUserInfo(userId).then(userInfo => {
     // this.userInfo = userInfo;
   // });
  }
  editProfile() {
  }
/*
  editProfile() {
    const userId = 'USER_ID'; 
    const updatedInfo = {
      name: this.userInfo.name,
      followers: this.userInfo.followers,
      following: this.userInfo.following,
    };
    this.firestoreService.updateUserInfo(userId, updatedInfo);
  }
  */
}