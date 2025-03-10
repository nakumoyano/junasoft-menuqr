import { ViewportScroller } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Producto } from 'src/app/models/producto/producto';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() categorias: Categoria[] = [];

  productos: Producto = new Producto();

  img: string =
    'https://w7.pngwing.com/pngs/483/255/png-transparent-computer-icons-food-others.png';

  private subscription = new Subscription();

  constructor(
    private categoriaService: CategoriasService,
    private productoService: ProductosService,
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }
  baseUrl = 'http://';
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.productos.urlImagen = `${this.baseUrl}/${this.productos.urlImagen}`;
  }

  loadingTreeTable: boolean = false;

  getAllDatos() {
    // Obtener los productos
    this.productoService.getAllData().subscribe(
      (dataProductos: any) => {
        const productos = dataProductos.resultado;

        // Obtener las categorías
        this.categoriaService.getAllData().subscribe(
          (dataCategorias: any) => {
            const categorias = dataCategorias.resultado;

            // Asignar productos a las categorías según su idCategoria
            categorias.forEach((categoria: any) => {
              categoria.productos = productos.filter(
                (producto: any) =>
                  producto.idCategoria === categoria.idCategoria
              );
            });

            // Almacenar las categorías con productos asociados
            this.categorias = categorias;

            // Verifica en consola si los productos se asociaron correctamente
            console.log('Datos de productos y categorías:', this.categorias);
          },
          (errorCategorias) => {
            console.error('Error al obtener las categorías:', errorCategorias);
          }
        );
      },
      (errorProductos) => {
        console.error('Error al obtener los productos:', errorProductos);
      }
    );
  }

  scrollToElement(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
