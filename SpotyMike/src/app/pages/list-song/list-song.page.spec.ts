import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSongPage } from './list-song.page';

describe('ListSongPage', () => {
  let component: ListSongPage;
  let fixture: ComponentFixture<ListSongPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
