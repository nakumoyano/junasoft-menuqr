import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Producto } from 'src/app/models/producto/producto';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
})
export class AgregarProductoComponent implements OnInit {
  @Input() categorias: Categoria[];

  mostrarSkeleton = false;

  producto: Producto;

  isEdit = false;
  loading = false;

  idProducto: number;

  private subscription = new Subscription();

  frmAddEditProducto: FormGroup;

  selectedFiles: File[] = [];

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedCategoria: string;

  archivos: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private productosService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.mostrarSkeleton = false;

    this.createForm();
    // this.cargarDatosEnFormulario();
    this.cargarCmbCategoria();
  }

  // f************************************** FUNCION PARA INICIALIZAR FORM ***************************
  createForm() {
    this.frmAddEditProducto = this.formBuilder.group({
      idProducto: [0],
      titulo: ['', Validators.required],
      precio: ['', Validators.required],
      idCategoria: ['', Validators.required],
      descripcion: [''],
      isCeliaco: [false],
      isVegetariano: [false],
      isVegano: [false],
    });
  }

  // f************************************** FUNCION PARA CREAR BARRIO ***************************
  onSave() {
    const formData = this.frmAddEditProducto.value;

    // Validar que el formulario sea válido y haya al menos una imagen
    if (this.frmAddEditProducto.valid) {
      this.loading = true;

      // Crear un array de archivos y enviar al servicio
      this.productosService
        .addData(
          0, // Si este es el ID de la categoría, ¿debería ser un número real o siempre 0?
          formData.titulo,
          formData.descripcion,
          this.selectedFiles,
          formData.precio,
          formData.isCeliaco,
          formData.isVegano,
          formData.isVegetariano,
          formData.idCategoria
        )
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.toastr.success('¡Categoría cargada con éxito!');
            this.frmAddEditProducto.reset();
            this.selectedFiles = [];
            this.loading = false;
            // location.reload();
          },
          error: (error: any) => {
            this.toastr.error(
              'Ha ocurrido un error. Espere e intente nuevamente.'
            );
            this.loading = false;
          },
        });
    } else {
      // Marcar los controles del formulario como tocados para mostrar errores
      Object.values(this.frmAddEditProducto.controls).forEach((control) => {
        control.markAsTouched();
      });

      // Mostrar mensaje si no hay imágenes seleccionadas
      // if (this.selectedFiles.length === 0) {
      //   this.toastr.error('Debe agregar al menos una imagen.');
      // } else {
      //   this.toastr.error('Complete los campos obligatorios.');
      // }
    }
  }

  // f************************************** FUNCION PARA EDITAR BARRIO ***************************
  onUpdate() {
    // if (this.frmAddEditProducto.valid) {
    //   this.loading = true;
    //   const formData = new FormData(); // Usamos FormData para enviar los archivos
    //   // Obtener los archivos existentes (URLs)
    //   let archivosExistentes: string[] = [];
    //   if (this.archivos.length > 0) {
    //     archivosExistentes = this.archivos.filter((url) => url.trim() !== '');
    //   }
    //   // Combinar archivos existentes con los nuevos
    //   const archivosFinales: File[] = [];
    //   // Simular Blobs para las URLs existentes (si es necesario)
    //   archivosExistentes.forEach((url) => {
    //     const blob = new Blob(); // Simulamos un Blob vacío (el backend debe manejar estos blobs)
    //     archivosFinales.push(new File([blob], url)); // Usamos la URL como nombreproducto del archivo
    //   });
    //   // Agregar archivos seleccionados al arreglo final
    //   if (this.selectedFiles && this.selectedFiles.length > 0) {
    //     this.selectedFiles.forEach((file) => {
    //       archivosFinales.push(file);
    //     });
    //   }
    //   // Agregar los valores del formulario al FormData
    //   const formValues = this.frmAddEditProducto.value;
    //   formData.append('idProducto', formValues.idProducto);
    //   formData.append('nombreproducto', formValues.nombreproducto);
    //   formData.append('descripcion', formValues.descripcion);
    //   formData.append('precio', formValues.precio);
    //   // Agregar los archivos al FormData
    //   archivosFinales.forEach((file) => {
    //     formData.append('files', file, file.name);
    //   });
    //   Swal.fire({
    //     title: '¿Estás seguro que deseas editar este producto?',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#2563EB',
    //     cancelButtonColor: '#4B5563',
    //     confirmButtonText: 'Si, editar',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.subscription.add(
    //         this.productosService
    //           .updateData(
    //             this.idProducto,
    //             formValues.nombreproducto,
    //             formValues.descripcion,
    //             formValues.precio,
    //             formValues.idProductos,
    //             formValues.urlImagenes,
    //             archivosFinales
    //           )
    //           .subscribe({
    //             next: (response: any) => {
    //               console.log('respuesta al editar', response);
    //               Swal.fire(
    //                 '¡Editado!',
    //                 '¡El producto se ha editado correctamente!',
    //                 'success'
    //               );
    //               this.loading = false;
    //               this.router
    //                 .navigate(['/admin/productos/listado-de-productos'])
    //                 .then(() => {
    //                   location.reload();
    //                 });
    //             },
    //             error: (error: any) => {
    //               console.log('error al editar productos', error);
    //               Swal.fire(
    //                 'Error!',
    //                 'Ha ocurrido un error. Inténtelo de nuevo más tarde.',
    //                 'error'
    //               );
    //             },
    //           })
    //       );
    //     }
    //   });
    // } else {
    //   this.toastr.error(
    //     'Ocurrió un error, revise los campos e intente nuevamente'
    //   );
    // }
  }

  // f************************************** FUNCION PARA CARGAR FORMULARIO CON DATOS ***************************
  // cargarDatosEnFormulario() {
  //   this.activatedRoute.params.subscribe((params) => {
  //     const id = params['id'];
  //     this.idProducto = id;

  //     if (id) {
  //       this.isEdit = true;
  //       this.mostrarSkeleton = true;
  //       this.productosService.getDataByIdProductoCompleto(id).subscribe(
  //         (data: any) => {
  //           console.log('data patchvalue', data);

  //           const resultado = data.resultado;

  //           // Mapear productos seleccionados
  //           this.selectedProducto = resultado.productos.map(
  //             (producto: any) => producto.idProducto
  //           );

  //           // PatchValue al formulario
  //           this.frmAddEditProducto.patchValue({
  //             idProductos: this.selectedProducto,
  //             precio: data.resultado.precio,
  //             nombreproducto: data.resultado.nombreproducto,
  //             descripcion: data.resultado.descripcion,
  //           });

  //           // Cargar las imágenes si existen
  //           const urlImagenes = resultado.urlImagenes;
  //           if (urlImagenes) {
  //             this.archivos = urlImagenes
  //               .split(',')
  //               .filter((url: any) => url.trim() !== '');
  //           }

  //           this.mostrarSkeleton = false;
  //         },
  //         (error) => {
  //           console.error(error);
  //           this.mostrarSkeleton = false;
  //         }
  //       );
  //     }
  //   });
  // }

  // D****************************************** FUCNIONES PARA EL INPUT DE ARCHIVO *****************
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.updateInputFiles();
  }

  updateInputFiles(): void {
    const dataTransfer = new DataTransfer();
    this.selectedFiles.forEach((file) => dataTransfer.items.add(file));
    const inputElement = document.getElementById(
      'file_input'
    ) as HTMLInputElement;
    inputElement.files = dataTransfer.files;
  }

  // F****************************************** FUNCIONES PARA MOSTRAR NOMBREPRODUCTO DE LOS ARCHIVOS *************************
  getFileName(url: string): string {
    const parts = url.split('/');
    const fullName = parts[parts.length - 1];
    return fullName.replace(/^\d+_\d+_/, '');
  }

  // F****************************************** FUNCIONES PARA ELIMINAR ARCHIVOS *************************
  removeArchivo(index: number): void {
    const archivoUrl = this.archivos[index];
    // Puedes hacer una llamada al servidor para eliminar el archivo, si es necesario
    // this.internacionService.deleteArchivo(archivoUrl).subscribe(/* ... */);
    this.archivos.splice(index, 1);
  }

  // f************************************** FUNCION PARA CARGAR COMBOS ***************************
  // CATEGORIA
  cargarCmbCategoria() {
    this.categoriasService.getAllData().subscribe(
      (data: any) => {
        console.log('respuesta categoria', data);

        const categorias = data.resultado;

        this.categorias = categorias;
        // console.log(this.especies);
      },
      (errorEspecies) => {
        // console.error('Error al obtener las especies:', errorEspecies);
      }
    );
  }

  // f************************************** GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO ***************************
  get controlTitulo(): FormControl {
    return this.frmAddEditProducto.controls['titulo'] as FormControl;
  }

  get controlDescripcion(): FormControl {
    return this.frmAddEditProducto.controls['descripcion'] as FormControl;
  }

  get controlPrecio(): FormControl {
    return this.frmAddEditProducto.controls['precio'] as FormControl;
  }

  get controlCeliaco(): FormControl {
    return this.frmAddEditProducto.controls['isCeliaco'] as FormControl;
  }

  get controlVegano(): FormControl {
    return this.frmAddEditProducto.controls['isVegano'] as FormControl;
  }

  get controlVegetariano(): FormControl {
    return this.frmAddEditProducto.controls['isVegetariano'] as FormControl;
  }

  get controlCategoria(): FormControl {
    return this.frmAddEditProducto.controls['idCategoria'] as FormControl;
  }
}
