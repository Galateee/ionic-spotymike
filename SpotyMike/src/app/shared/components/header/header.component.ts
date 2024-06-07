import { Router } from '@angular/router';
import { Component, OnInit, Input, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonLabel, IonBackButton } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { searchOutline, ellipsisHorizontal, chevronBackOutline } from 'ionicons/icons';

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
}
