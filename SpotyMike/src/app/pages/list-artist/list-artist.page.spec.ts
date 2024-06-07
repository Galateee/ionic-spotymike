import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListArtistPage } from './list-artist.page';

describe('ListArtistPage', () => {
  let component: ListArtistPage;
  let fixture: ComponentFixture<ListArtistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArtistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
