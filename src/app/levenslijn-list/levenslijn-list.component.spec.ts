import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevenslijnListComponent } from './levenslijn-list.component';

describe('LevenslijnListComponent', () => {
  let component: LevenslijnListComponent;
  let fixture: ComponentFixture<LevenslijnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevenslijnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevenslijnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
