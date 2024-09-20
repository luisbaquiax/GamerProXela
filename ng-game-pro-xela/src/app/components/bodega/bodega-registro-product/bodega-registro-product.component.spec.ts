import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegaRegistroProductComponent } from './bodega-registro-product.component';

describe('BodegaRegistroProductComponent', () => {
  let component: BodegaRegistroProductComponent;
  let fixture: ComponentFixture<BodegaRegistroProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodegaRegistroProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodegaRegistroProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
