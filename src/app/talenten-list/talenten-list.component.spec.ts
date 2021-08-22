import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentenListComponent } from './talenten-list.component';

describe('TalentenListComponent', () => {
  let component: TalentenListComponent;
  let fixture: ComponentFixture<TalentenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentenListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
