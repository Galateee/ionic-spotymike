import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class PlayerPage implements OnInit, OnDestroy {
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
  isPlaying: boolean = false; // Start with music paused
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
  rangeValue: number = 0;
  intervalId: any;

  playMusic() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.intervalId = setInterval(() => {
        this.rangeValue += 1;
        if (this.rangeValue > 100) {
          this.rangeValue = 0; // Reset for demo purposes
        }
        this.updateLyrics();
      }, 1000); // Update every second
    } else {
      clearInterval(this.intervalId);
    }
  }

  updateLyrics() {
    const lyricIndex = Math.floor(this.rangeValue / (100 / this.lyrics.length));
    this.currentLyric = this.lyrics[lyricIndex];
  }

  onIonChange(event: any) {
    this.rangeValue = event.detail.value;
    this.updateLyrics();
  }

  makeFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {}

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
