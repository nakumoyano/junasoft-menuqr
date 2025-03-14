import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'primeng/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleriaModule } from 'primeng/galleria';
import { AccordionModule } from 'primeng/accordion';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { PanelRightComponent } from './components/panel-right/panel-right.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AgregarCategoriaComponent } from './panel/categorias/agregar-categoria/agregar-categoria.component';
import { BotonCancelarComponent } from './components/boton-cancelar/boton-cancelar.component';
import { SkeletonGridComponent } from './components/skeleton-grid/skeleton-grid.component';
import { ListadoDeCategoriasComponent } from './panel/categorias/listado-de-categorias/listado-de-categorias.component';
import { BotonEliminarComponent } from './components/boton-eliminar/boton-eliminar.component';
import { AgregarProductoComponent } from './panel/productos/agregar-producto/agregar-producto.component';
import { ListadoDeProductosComponent } from './panel/productos/listado-de-productos/listado-de-productos.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MalaCalificacionComponent } from './pages/resenias/mala-calificacion/mala-calificacion.component';
import { CalificacionEstrellasComponent } from './pages/resenias/calificacion-estrellas/calificacion-estrellas.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, DashboardComponent, PanelRightComponent, InicioComponent, AgregarCategoriaComponent, BotonCancelarComponent, SkeletonGridComponent, ListadoDeCategoriasComponent, BotonEliminarComponent, AgregarProductoComponent, ListadoDeProductosComponent, MenuComponent, NavbarComponent, MalaCalificacionComponent, CalificacionEstrellasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    GalleriaModule,
    AccordionModule,
    MenuModule,
    BadgeModule,
    AvatarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    CardModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    ImageModule,
    DialogModule,

    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
