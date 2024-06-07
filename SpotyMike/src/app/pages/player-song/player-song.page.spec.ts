import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerSongPage } from './player-song.page';

describe('PlayerSongPage', () => {
  let component: PlayerSongPage;
  let fixture: ComponentFixture<PlayerSongPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
