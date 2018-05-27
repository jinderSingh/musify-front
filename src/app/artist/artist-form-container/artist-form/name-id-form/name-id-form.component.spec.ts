import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameIdFormComponent } from './name-id-form.component';

describe('NameIdFormComponent', () => {
  let component: NameIdFormComponent;
  let fixture: ComponentFixture<NameIdFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameIdFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameIdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
