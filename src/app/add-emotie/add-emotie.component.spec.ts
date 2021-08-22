import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmotieComponent } from './add-emotie.component';

describe('AddEmotieComponent', () => {
  let component: AddEmotieComponent;
  let fixture: ComponentFixture<AddEmotieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmotieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmotieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
