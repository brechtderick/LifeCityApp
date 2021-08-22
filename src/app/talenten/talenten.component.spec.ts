import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentenComponent } from './talenten.component';

describe('TalentenComponent', () => {
  let component: TalentenComponent;
  let fixture: ComponentFixture<TalentenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
