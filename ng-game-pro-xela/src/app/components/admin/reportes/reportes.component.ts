import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoUsuario } from 'src/app/objetos/enum/TipoUsuario';
import { ReportTop10Clientes } from 'src/app/objetos/interfaces/ReportTop10Clientes';
import { ReportTopArticulos } from 'src/app/objetos/interfaces/ReportTopArticulos';
import { ReportTopSucursales } from 'src/app/objetos/interfaces/ReportTopSucursales';
import { ReportTopVentas } from 'src/app/objetos/interfaces/ReportTopVentas';
import { Usuario } from 'src/app/objetos/interfaces/Usuario';
import { ServiceAdminService } from 'src/app/services/service-admin/ServiceAdmin.service';
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

  fomrGroup: FormGroup;

  showTopVentas: boolean = false;

  user: Usuario;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private serviceReporte: ServiceAdminService,
    private serviceSesion: SesionService,
    private fb: FormBuilder,
  ) {
    this.fomrGroup = this.fb.group({
      fecha1: [null,[Validators.required]],
      fecha2: [null,[Validators.required]]
    });
    this.reporte = Number(this.activeRouter.snapshot.paramMap.get('reporte'));
    let userJson = localStorage.getItem('userLogin');
    this.user = userJson? JSON.parse(userJson) : null;
  }

  ngOnInit(): void {
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
        break;
      case 2:
        const fecha1 = this.fomrGroup.value.fecha1;
        const fecha2 = this.fomrGroup.value.fecha2;
        console.log('fecha1 ',fecha1);
        console.log(fecha2);
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
      default:
        console.log('No hay reporte con ese ID');
    }
  }

  public mostarDivTopVentas(): void {
    this.showTopVentas = true;
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
}
