import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPunctuationComponent } from './add-punctuation.component';

describe('AddPunctuationComponent', () => {
  let component: AddPunctuationComponent;
  let fixture: ComponentFixture<AddPunctuationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPunctuationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPunctuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
