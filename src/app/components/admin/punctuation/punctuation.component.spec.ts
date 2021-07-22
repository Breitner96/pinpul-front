import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunctuationComponent } from './punctuation.component';

describe('PunctuationComponent', () => {
  let component: PunctuationComponent;
  let fixture: ComponentFixture<PunctuationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunctuationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PunctuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
