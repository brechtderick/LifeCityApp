import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoelenComponent } from './doelen.component';

describe('DoelenComponent', () => {
  let component: DoelenComponent;
  let fixture: ComponentFixture<DoelenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoelenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoelenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
