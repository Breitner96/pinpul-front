import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeCompanyComponent } from './add-type-company.component';

describe('AddTypeCompanyComponent', () => {
  let component: AddTypeCompanyComponent;
  let fixture: ComponentFixture<AddTypeCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypeCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
