import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegaMenuComponent } from './bodega-menu.component';

describe('BodegaMenuComponent', () => {
  let component: BodegaMenuComponent;
  let fixture: ComponentFixture<BodegaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodegaMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodegaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
