import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistFormContainerComponent } from './artist-form-container.component';

describe('ArtistFormContainerComponent', () => {
  let component: ArtistFormContainerComponent;
  let fixture: ComponentFixture<ArtistFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
