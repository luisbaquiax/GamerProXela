import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegaProductosComponent } from './bodega-productos.component';

describe('BodegaProductosComponent', () => {
  let component: BodegaProductosComponent;
  let fixture: ComponentFixture<BodegaProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodegaProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodegaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
