import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHulpbronComponent } from './add-hulpbron.component';

describe('AddHulpbronComponent', () => {
  let component: AddHulpbronComponent;
  let fixture: ComponentFixture<AddHulpbronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHulpbronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHulpbronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
