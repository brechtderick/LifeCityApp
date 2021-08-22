import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevenslijnComponent } from './add-levenslijn.component';

describe('AddLevenslijnComponent', () => {
  let component: AddLevenslijnComponent;
  let fixture: ComponentFixture<AddLevenslijnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLevenslijnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLevenslijnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
