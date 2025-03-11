import { Producto } from '../producto/producto';

export class Categoria {
  idCategoria: number;
  nombreCategoria: string;
  linkEnlaceMenu: string;
  file: any;
  productos?: Producto[];
  urlImagenLogo?: string;
}
