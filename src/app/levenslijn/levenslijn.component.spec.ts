import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevenslijnComponent } from './levenslijn.component';

describe('LevenslijnComponent', () => {
  let component: LevenslijnComponent;
  let fixture: ComponentFixture<LevenslijnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevenslijnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevenslijnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
