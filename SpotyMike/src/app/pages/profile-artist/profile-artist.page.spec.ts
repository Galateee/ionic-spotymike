import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileArtistPage } from './profile-artist.page';

describe('ProfileArtistPage', () => {
  let component: ProfileArtistPage;
  let fixture: ComponentFixture<ProfileArtistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileArtistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
