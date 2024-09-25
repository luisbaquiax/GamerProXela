import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioEstanteriasComponent } from './inventario-estanterias.component';

describe('InventarioEstanteriasComponent', () => {
  let component: InventarioEstanteriasComponent;
  let fixture: ComponentFixture<InventarioEstanteriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioEstanteriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioEstanteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
