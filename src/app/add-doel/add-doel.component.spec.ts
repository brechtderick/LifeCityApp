import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoelComponent } from './add-doel.component';

describe('AddDoelComponent', () => {
  let component: AddDoelComponent;
  let fixture: ComponentFixture<AddDoelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
