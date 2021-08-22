import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotieListComponent } from './emotie-list.component';

describe('EmotieListComponent', () => {
  let component: EmotieListComponent;
  let fixture: ComponentFixture<EmotieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmotieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
