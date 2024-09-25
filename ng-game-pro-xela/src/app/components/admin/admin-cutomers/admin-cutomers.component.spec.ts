import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCutomersComponent } from './admin-cutomers.component';

describe('AdminCutomersComponent', () => {
  let component: AdminCutomersComponent;
  let fixture: ComponentFixture<AdminCutomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCutomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCutomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
