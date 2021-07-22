import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeDocumentComponent } from './add-type-document.component';

describe('AddTypeDocumentComponent', () => {
  let component: AddTypeDocumentComponent;
  let fixture: ComponentFixture<AddTypeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypeDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
