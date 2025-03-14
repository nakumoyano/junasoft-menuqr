import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resenia } from 'src/app/models/resenia/resenia';

@Injectable({
  providedIn: 'root',
})
export class ReseniasService {
  private API_URL = 'https://apimenuqr.junasoft.com/Resenias';

  constructor(private http: HttpClient) {}

  //obtener datos
  getAllResenias(): Observable<Resenia[]> {
    return this.http.get<Resenia[]>(this.API_URL);
  }

  // cargar datos
  addResenia(resenia: Resenia): Observable<Resenia[]> {
    return this.http.post<Resenia[]>(this.API_URL, resenia);
  }
}
