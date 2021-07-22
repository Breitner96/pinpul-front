import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaBlogComponent } from './vista-blog.component';

describe('VistaBlogComponent', () => {
  let component: VistaBlogComponent;
  let fixture: ComponentFixture<VistaBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
