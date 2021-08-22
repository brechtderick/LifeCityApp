import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotieregulatieComponent } from './emotieregulatie.component';

describe('EmotieregulatieComponent', () => {
  let component: EmotieregulatieComponent;
  let fixture: ComponentFixture<EmotieregulatieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmotieregulatieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotieregulatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
