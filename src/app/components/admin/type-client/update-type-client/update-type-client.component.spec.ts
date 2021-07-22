import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeClientComponent } from './update-type-client.component';

describe('UpdateTypeClientComponent', () => {
  let component: UpdateTypeClientComponent;
  let fixture: ComponentFixture<UpdateTypeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTypeClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
