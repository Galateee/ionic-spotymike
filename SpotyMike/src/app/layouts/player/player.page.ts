import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonButton,
  IonBackButton,
  IonIcon,
  IonImg,
  IonRange,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  ellipsisHorizontal,
  expand,
  heart,
  heartOutline,
  pauseCircle,
  playCircle,
  playSkipBackOutline,
  playSkipForwardOutline,
  repeat,
  shareOutline,
  shareSocialOutline,
  shuffle,
} from 'ionicons/icons';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCard,
    IonRange,
    IonImg,
    IonIcon,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class PlayerPage implements OnInit {
  constructor() {
    addIcons({
      repeat,
      shareOutline,
      heartOutline,
      shareSocialOutline,
      heart,
      playSkipBackOutline,
      playCircle,
      pauseCircle,
      playSkipForwardOutline,
      shuffle,
      ellipsisHorizontal,
      expand,
    });
  }

  isFavorite: boolean = false;
  isPlaying: boolean = true;
  isExpanded: boolean = false;
  lyrics: string[] = [
    'Beneath the palm trees, we found our way, On this island, where the sun shines every day.',
    'The ocean breeze whispers secrets in the air, In this paradise, we\'ll forget all our cares.',
    'Island getaway, where the waves gently sway, Underneath the golden sun\'s warm embrace.',
    'With sandy shores, and clear blue skies, In this haven, we\'ll watch our worries subside.',
    'Crystal waters, inviting and so clear, As we explore, the island\'s treasures appear.',
    'Adventure calls us, with each rising tide, In this magical place, our spirits come alive.',
  ];
  currentLyric: string = this.lyrics[0];

  playMusic() {
    this.isPlaying = !this.isPlaying;
  }

  onIonChange(event: any) {
    const value = event.detail.value;
    const lyricIndex = Math.floor(value / (100 / this.lyrics.length));
    this.currentLyric = this.lyrics[lyricIndex];
  }

  makeFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {}
}
