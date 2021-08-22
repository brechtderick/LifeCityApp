import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoelListComponent } from './doel-list.component';

describe('DoelListComponent', () => {
  let component: DoelListComponent;
  let fixture: ComponentFixture<DoelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
