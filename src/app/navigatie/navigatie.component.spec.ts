import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatieComponent } from './navigatie.component';

describe('NavigatieComponent', () => {
  let component: NavigatieComponent;
  let fixture: ComponentFixture<NavigatieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigatieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
