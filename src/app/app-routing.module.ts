import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AgregarCategoriaComponent } from './panel/categorias/agregar-categoria/agregar-categoria.component';
import { ListadoDeCategoriasComponent } from './panel/categorias/listado-de-categorias/listado-de-categorias.component';
import { AgregarProductoComponent } from './panel/productos/agregar-producto/agregar-producto.component';
import { ListadoDeProductosComponent } from './panel/productos/listado-de-productos/listado-de-productos.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  //F ************************************* PAGINAS **********************************
  // INICIO
  {
    path: '',
    component: InicioComponent,
    data: { title: 'Inicio | Menú QR' },
  },
  // VER MENU
  {
    path: 'ver-menu',
    component: MenuComponent,
    data: { title: 'Ver Menú | Menú QR' },
  },
  //F ************************************* PANEL **********************************
  // ------------------------ DASHBOARD
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard | Menú QR' },
  },
  // ------------------------ CATEGORIAS
  {
    path: 'admin/categorias/crear-categoria',
    component: AgregarCategoriaComponent,
    data: { title: 'Crear Categoría | Menú QR' },
  },
  {
    path: 'admin/categorias/editar-categoria/:id',
    component: AgregarCategoriaComponent,
    data: { title: 'Editar Categoría | Menú QR' },
  },
  {
    path: 'admin/categorias/listado-de-categorias',
    component: ListadoDeCategoriasComponent,
    data: { title: 'Listado de Categorías | Menú QR' },
  },
  // ------------------------ PRODUCTOS
  {
    path: 'admin/productos/agregar-producto',
    component: AgregarProductoComponent,
    data: { title: 'Agregar Producto | Menú QR' },
  },
  {
    path: 'admin/productos/editar-producto/:id',
    component: AgregarProductoComponent,
    data: { title: 'Agregar Editar | Menú QR' },
  },
  {
    path: 'admin/productos/listado-de-productos',
    component: ListadoDeProductosComponent,
    data: { title: 'Listado de Productos | Menú QR' },
  },

  //F ************************************* VOLVER A INICIO **********************************
  {
    path: '**',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
