import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudTarjeta } from 'src/app/objetos/interfaces/SolicitudTarjeta';
import { TarjetaModel } from 'src/app/objetos/interfaces/TarjetaModel';

@Injectable({
  providedIn: 'root',
})
export class ServiceTarjetaService {
  url: string = 'http://localhost:3001/api/tarjetas';

  constructor(private http: HttpClient) {}

  public insertSolicitud(solicitud: SolicitudTarjeta): Observable<any> {
    return this.http.post<any>(this.url + `/solicitud`, solicitud);
  }

  public getSolicitudes(): Observable<SolicitudTarjeta[]> {
    return this.http.get<SolicitudTarjeta[]>(this.url+"list");
  }

  public updateSolicitud(solicitud: SolicitudTarjeta): Observable<any> {
    return this.http.put<any>(this.url + `/solicitud/${solicitud.id}`, solicitud);
  }
  
  public createTarjeta(tarjeta: TarjetaModel): Observable<any> {
    return this.http.post(this.url + `/tarjeta`, tarjeta);
  }

  public getTarjetaByNit(nit: string): Observable<TarjetaModel> {
    return this.http.get<TarjetaModel>(this.url + `/tarjeta/${nit}`);
  }

  public updateTarjeta(tarjeta: TarjetaModel): Observable<any> {
    return this.http.put<any>(this.url + `/tarjeta/${tarjeta.id}`, tarjeta);
  }

  public listTarjetas(): Observable<TarjetaModel[]> {
    return this.http.get<TarjetaModel[]>(this.url+"/tarjeta/list");
  }

}
