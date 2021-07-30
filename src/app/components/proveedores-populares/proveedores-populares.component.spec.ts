import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresPopularesComponent } from './proveedores-populares.component';

describe('ProveedoresPopularesComponent', () => {
  let component: ProveedoresPopularesComponent;
  let fixture: ComponentFixture<ProveedoresPopularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresPopularesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
