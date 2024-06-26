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
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-player-song',
  templateUrl: './player-song.page.html',
  styleUrls: ['./player-song.page.scss'],
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
    HeaderComponent,
  ],
})
export class PlayerSongPage implements OnInit, OnDestroy {
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
  isRepeat: boolean = false; // Manage repeat state
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
    if (this.rangeValue === 100) {
      this.rangeValue = 0;
      this.isPlaying = true;
      this.startPlaybackInterval();
    } else {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.startPlaybackInterval();
      } else {
        this.pausePlayback();
      }
    }
  }

  startPlaybackInterval() {
    this.intervalId = setInterval(() => {
      this.rangeValue += 1;
      if (this.rangeValue > 100) {
        if (!this.isRepeat) {
          this.rangeValue = 100;
          this.isPlaying = false;
          clearInterval(this.intervalId);
        } else {
          this.rangeValue = 0;
        }
      }
      this.updateLyrics();
    }, 1000); // Update every second
  }

  pausePlayback() {
    clearInterval(this.intervalId);
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

  toggleRepeat() {
    this.isRepeat = !this.isRepeat;
  }

  skipBack() {
    this.rangeValue = Math.max(this.rangeValue - 100);
    this.updateLyrics();
  }

  skipForward() {
    this.rangeValue = Math.min(this.rangeValue + 100);
    this.updateLyrics();
  }

  shuffleSongs() {
    this.lyrics = this.shuffleArray(this.lyrics);
    this.currentLyric = this.lyrics[0];
    this.rangeValue = 0;
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  ngOnInit() {}

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
