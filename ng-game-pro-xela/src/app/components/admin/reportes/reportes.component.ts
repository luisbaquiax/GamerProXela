import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { DetalleVent } from 'src/app/objetos/interfaces/DetalleVent';
import { ReportTop10Clientes } from 'src/app/objetos/interfaces/ReportTop10Clientes';
import { ReportTopArticulos } from 'src/app/objetos/interfaces/ReportTopArticulos';
import { ReportTopSucursales } from 'src/app/objetos/interfaces/ReportTopSucursales';
import { ReportTopVentas } from 'src/app/objetos/interfaces/ReportTopVentas';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { ServiceAdminService } from 'src/app/services/service-admin/ServiceAdmin.service';
import { ServiceVentaService } from 'src/app/services/service-venta/ServiceVenta.service';
import { SesionService } from 'src/app/services/sesion/Sesion.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  reporte: number = 0;

  topVentas: ReportTopVentas[] = [];
  topSucursales: ReportTopSucursales[] = [];
  topClientes: ReportTop10Clientes[] = [];
  topArticulos: ReportTopArticulos[] = [];

  productosVenta: DetalleVent[] = [];
  totalDetalle: number = 0;

  fomrGroup: FormGroup;
  fomrGroupHistorial: FormGroup;

  showTopVentas: boolean = false;
  showForm: boolean = false;
  showHistorial: boolean = false;
  title: string = '';

  user: Usuario;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private serviceReporte: ServiceAdminService,
    private serviceSesion: SesionService,
    private serviceVenta: ServiceVentaService,
    private fb: FormBuilder,
  ) {
    this.fomrGroup = this.fb.group({
      fecha1: [null,[Validators.required]],
      fecha2: [null,[Validators.required]]
    });

    this.fomrGroupHistorial = this.fb.group({
      fechaH1: [null,[Validators.required]],
      fechaH2: [null,[Validators.required]]
    });

    this.reporte = Number(this.activeRouter.snapshot.paramMap.get('reporte'));
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson? JSON.parse(userJson) : null;
  }

  ngOnInit(): void {
    this.serviceSesion.validarSesion();
    if(this.user !=null){
      if(this.user.tipo != TipoUsuario.ADMIN){
        this.router.navigate(['/login']);
        return;
      }
    }
    this.activeRouter.params.subscribe((params) => {
      this.reporte = Number(params['reporte']);
      this.generarReporte();
    });
  }

  generarReporte(): void {
    switch (this.reporte) {
      case 1:
        this.showTopVentas = false
        this.showDivHistorial();
        break;
      case 2:
        this.mostarDivTopVentas();
        break;
      case 3:
        this.showTopVentas = false;
        this.serviceReporte.getTopSucursales().subscribe((list) => {
          this.topSucursales = list;
          console.log(this.topSucursales);
        });
        break;
      case 4:
        this.showTopVentas = false;
        this.serviceReporte.getTopProductos().subscribe((list) => {
          this.topArticulos = list;
        });
        break;
      case 5:
        this.showTopVentas = false;
        this.serviceReporte.getTopClientes().subscribe((list) => {
          this.topClientes = list;
        });
        break;
      case 6:
        this.showTopVentas = true;
        this.showForm = false;
        break
      case 7:
        this.showTopVentas = true;
        this.showForm = false;
        break;
      case 8:
        this.showDivHistorial();
        break  
      default:
        console.log('No hay reporte con ese ID');
    }
  }

  public mostarDivTopVentas(): void {
    this.showTopVentas = true;
    this.showForm = true;
    this.title = 'Top 10 Ventas';
  }

  public generarReporteVentas(): void {
    const fecha1 = this.fomrGroup.value.fecha1;
    const fecha2 = this.fomrGroup.value.fecha2;
    if (fecha1 && fecha2) {
      this.serviceReporte.getTopVentas(fecha1, fecha2).subscribe((list) => {
        this.topVentas = list;
      });
    } else {
      alert('Debe seleccionar ambas fechas');
    }
  }

  public generarDetalleVentas(codigoVenta: number): void {
    this.serviceVenta.getDetalleVenta(codigoVenta).subscribe((detalle) => {
      this.productosVenta = detalle;
      this.totalDetalle = this.productosVenta.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    },
    (error)=>{
      console.log('Error al obtener el detalle de la venta');
    });
    
  }

  public generarVentasPorCliente(nitCliente: string, nombre:string): void {
    this.router.navigate(['/admin-reports/6']);
    this.title = `Compras del cliente: ${nombre}`;
    this.serviceVenta.getVentasCliente(nitCliente).subscribe((list) => {
      this.topVentas = list;
    });
  }

  public generarVentasPorSucursal(codigSucursal: number, nombre: string): void {
    this.router.navigate(['/admin-reports/7']);
    this.title = `Ventas de la sucursal: ${nombre}`;
    this.serviceVenta.getVentasSucursal(codigSucursal).subscribe((list) => {
      this.topVentas = list;
    });
  }

  public showDivHistorial(): void {
    this.showTopVentas = false;
    this.title = 'Historial de Ventas con Descuento';
    this.showHistorial = true;
  }

  public setHistorial(): void {
    const fecha1 = this.fomrGroupHistorial.value.fechaH1;
    const fecha2 = this.fomrGroupHistorial.value.fechaH2;
    this.serviceReporte.getHistorialVentasConDescuento(fecha1, fecha2).subscribe(
      (list) => {
        this.topVentas = list;
      },
    );
  }
}
