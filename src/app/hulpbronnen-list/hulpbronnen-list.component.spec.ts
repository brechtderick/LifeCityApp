import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HulpbronnenListComponent } from './hulpbronnen-list.component';

describe('HulpbronnenListComponent', () => {
  let component: HulpbronnenListComponent;
  let fixture: ComponentFixture<HulpbronnenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HulpbronnenListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HulpbronnenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
