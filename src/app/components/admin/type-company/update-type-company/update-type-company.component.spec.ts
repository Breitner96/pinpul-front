import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeCompanyComponent } from './update-type-company.component';

describe('UpdateTypeCompanyComponent', () => {
  let component: UpdateTypeCompanyComponent;
  let fixture: ComponentFixture<UpdateTypeCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTypeCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
