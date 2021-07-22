import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPunctuationComponent } from './edit-punctuation.component';

describe('EditPunctuationComponent', () => {
  let component: EditPunctuationComponent;
  let fixture: ComponentFixture<EditPunctuationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPunctuationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPunctuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
