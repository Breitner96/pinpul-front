import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeClientComponent } from './add-type-client.component';

describe('AddTypeClientComponent', () => {
  let component: AddTypeClientComponent;
  let fixture: ComponentFixture<AddTypeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypeClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
