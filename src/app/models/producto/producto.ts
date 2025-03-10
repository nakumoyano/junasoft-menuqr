import { Categoria } from '../categoria/categoria';

export class Producto {
  idProducto: number;
  titulo: string;
  descripcion: string;
  file: any;
  precio: number;
  isCeliaco: boolean;
  isVegano: boolean;
  isVegetariano: boolean;
  idCategoria: number;
  categoria?: Categoria;
}
