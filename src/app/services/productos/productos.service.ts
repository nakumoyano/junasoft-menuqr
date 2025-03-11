import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private API_URL = 'https://apimenuqr.junasoft.com/Productos';

  constructor(private http: HttpClient) {}

  // MOSTRAR DATOS
  getAllData(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_URL);
  }

  // CARGAR DATOS
  addData(
    idProducto: number,
    titulo: string,
    descripcion: string,
    file: any,
    precio: number,
    isCeliaco: number,
    isVegano: number,
    isVegetariano: number,
    idCategoria: number
  ): Observable<Producto> {
    const formData: FormData = new FormData();

    formData.append('idProducto', idProducto.toString());
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);

    if (precio !== null && precio !== undefined) {
      formData.append('precio', precio.toString());
    }
    if (isCeliaco !== null && isCeliaco !== undefined) {
      formData.append('isCeliaco', isCeliaco.toString());
    }
    if (isVegano !== null && isVegano !== undefined) {
      formData.append('isVegano', isVegano.toString());
    }
    if (isVegetariano !== null && isVegetariano !== undefined) {
      formData.append('isVegetariano', isVegetariano.toString());
    }
    if (idCategoria !== null && idCategoria !== undefined) {
      formData.append('idCategoria', idCategoria.toString());
    }

    if (file && file.length > 0) {
      file.forEach((file: any) => {
        formData.append('file', file, file.name);
      });
    }

    return this.http.post<Producto>(this.API_URL, formData);
  }

  // EDITAR DATOS
  // updateData(producto: Producto): Observable<Producto> {
  //   return this.http.put<Producto>(
  //     this.API_URL + '/' + producto.idProducto,
  //     producto
  //   );
  // }
  updateData(
    idProducto: number,
    titulo: string,
    descripcion: string,
    file: any,
    precio: number,
    isCeliaco: number,
    isVegano: number,
    isVegetariano: number,
    idCategoria: number
  ): Observable<Producto> {
    const formData: FormData = new FormData();

    formData.append('idProducto', idProducto.toString());
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);

    if (precio !== null && precio !== undefined) {
      formData.append('precio', precio.toString());
    }
    if (isCeliaco !== null && isCeliaco !== undefined) {
      formData.append('isCeliaco', isCeliaco.toString());
    }
    if (isVegano !== null && isVegano !== undefined) {
      formData.append('isVegano', isVegano.toString());
    }
    if (isVegetariano !== null && isVegetariano !== undefined) {
      formData.append('isVegetariano', isVegetariano.toString());
    }
    if (idCategoria !== null && idCategoria !== undefined) {
      formData.append('idCategoria', idCategoria.toString());
    }

    if (file && file.length > 0) {
      file.forEach((file: any) => {
        formData.append('file', file, file.name);
      });
    }

    return this.http.put<Producto>(`${this.API_URL}/${idProducto}`, formData);
  }

  // GET BY ID
  getDataById(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.API_URL + '/' + id);
  }

  // ELIMINAR DATOS
  deleteData(producto: Producto): Observable<Producto[]> {
    return this.http.delete<Producto[]>(
      this.API_URL + '/' + producto.idProducto
    );
  }
}
