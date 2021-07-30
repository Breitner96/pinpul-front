import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasPopularesComponent } from './categorias-populares.component';

describe('CategoriasPopularesComponent', () => {
  let component: CategoriasPopularesComponent;
  let fixture: ComponentFixture<CategoriasPopularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasPopularesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
