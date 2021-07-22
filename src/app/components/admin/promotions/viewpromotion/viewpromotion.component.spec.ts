import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpromotionComponent } from './viewpromotion.component';

describe('ViewpromotionComponent', () => {
  let component: ViewpromotionComponent;
  let fixture: ComponentFixture<ViewpromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
