import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HulpbronnenComponent } from './hulpbronnen.component';

describe('HulpbronnenComponent', () => {
  let component: HulpbronnenComponent;
  let fixture: ComponentFixture<HulpbronnenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HulpbronnenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HulpbronnenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
