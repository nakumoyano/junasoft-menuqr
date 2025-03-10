import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private API_URL = 'https://apimenuqr.junasoft.com/Categorias';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idCategoria: number,
    nombreCategoria: string,
    linkEnlaceMenu: string,
    files: any
  ): Observable<Categoria> {
    const formData: FormData = new FormData();

    formData.append('idCategoria', idCategoria.toString());
    formData.append('nombreCategoria', nombreCategoria);
    formData.append('linkEnlaceMenu', linkEnlaceMenu || ''); // Asegúrate de pasar un valor vacío si no hay link

    if (files && files.length > 0) {
      files.forEach((file: any) => {
        console.log('Archivo agregado al FormData: ', file); // Verifica que los archivos estén aquí
        formData.append('file', file, file.name); // Asegúrate de que el nombre 'urlImagenLogo' sea correcto
      });
    }

    return this.http.post<Categoria>(this.API_URL, formData);
  }

  // EDITAR DATOS
  updateData(
    idCategoria: number,
    nombreCategoria: string,
    linkEnlaceMenu: string,
    files: any
  ): Observable<Categoria> {
    const formData: FormData = new FormData();

    formData.append('idCategoria', idCategoria.toString());
    formData.append('nombreCategoria', nombreCategoria);
    formData.append('linkEnlaceMenu', linkEnlaceMenu); // Asegúrate de pasar un valor vacío si no hay link

    if (files && files.length > 0) {
      files.forEach((file: any) => {
        formData.append('file', file, file.name); // Asegúrate de que el nombre 'urlImagenLogo' sea correcto
      });
    }

    return this.http.put<Categoria>(`${this.API_URL}/${idCategoria}`, formData);
  }

  // GET BY ID
  getDataById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(categoria: Categoria): Observable<Categoria[]> {
    return this.http.delete<Categoria[]>(
      this.API_URL + '/' + categoria.idCategoria
    );
  }
}
