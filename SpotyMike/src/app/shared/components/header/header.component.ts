import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronBackOutline, ellipsisHorizontal, searchOutline } from 'ionicons/icons';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonBackButton, IonLabel, IonTitle, IonIcon, IonButton, IonButtons, IonToolbar, IonHeader, CommonModule,
  ],
})
export class HeaderComponent  implements OnInit {

  @Input() startIcon?: string;
  @Input() headerTitle?: string;
  @Input() endIcon?: string;

  private alert = inject(AlertService);

  constructor() { }

  ngOnInit() {
    addIcons({ searchOutline, ellipsisHorizontal, chevronBackOutline });
  }

  private router = inject(Router);

  profilePage() {
    this.router.navigateByUrl('/home/profile');
  }
  searchPage() {
    this.router.navigateByUrl('/search');
  }
  presentAlert(){
    this.alert.presentAlert();
  }
}
