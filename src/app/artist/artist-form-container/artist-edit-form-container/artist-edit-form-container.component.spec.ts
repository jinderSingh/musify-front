import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistEditFormContainerComponent } from './artist-edit-form-container.component';

describe('ArtistEditFormContainerComponent', () => {
  let component: ArtistEditFormContainerComponent;
  let fixture: ComponentFixture<ArtistEditFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistEditFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistEditFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
