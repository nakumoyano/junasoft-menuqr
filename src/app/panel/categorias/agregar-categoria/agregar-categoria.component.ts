import { Component, OnInit } from '@angular/core';
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

import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css'],
})
export class AgregarCategoriaComponent implements OnInit {
  mostrarSkeleton = false;

  categoria: Categoria;

  isEdit = false;
  loading = false;

  idCategoria: number;

  private subscription = new Subscription();

  frmAddEditCategoria: FormGroup;

  selectedFiles: File[] = [];

  archivos: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoriasService: CategoriasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarSkeleton = false;

    this.createForm();
    this.cargarDatosEnFormulario();
  }

  // f************************************** FUNCION PARA INICIALIZAR FORM ***************************
  createForm() {
    this.frmAddEditCategoria = this.formBuilder.group({
      idCategoria: [0],
      nombreCategoria: ['', Validators.required],
    });
  }

  // f************************************** FUNCION PARA CREAR BARRIO ***************************
  onSave() {
    const formData = this.frmAddEditCategoria.value;

    // Validar que el formulario sea válido y haya al menos una imagen
    if (this.frmAddEditCategoria.valid) {
      this.loading = true;

      // Crear un array de archivos y enviar al servicio
      this.categoriasService
        .addData(
          0, // Si este es el ID de la categoría, ¿debería ser un número real o siempre 0?
          formData.nombreCategoria,
          '',
          this.selectedFiles // Pasamos los archivos seleccionados
        )
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.toastr.success('¡Categoría cargada con éxito!');
            this.frmAddEditCategoria.reset();
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
      Object.values(this.frmAddEditCategoria.controls).forEach((control) => {
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
    if (this.frmAddEditCategoria.valid) {
      this.loading = true;
      const formData = new FormData(); // Usamos FormData para enviar los archivos
      // Obtener los archivos existentes (URLs)
      let archivosExistentes: string[] = [];
      if (this.archivos.length > 0) {
        archivosExistentes = this.archivos.filter((url) => url.trim() !== '');
      }
      // Combinar archivos existentes con los nuevos
      const archivosFinales: File[] = [];
      // Simular Blobs para las URLs existentes (si es necesario)
      archivosExistentes.forEach((url) => {
        const blob = new Blob(); // Simulamos un Blob vacío (el backend debe manejar estos blobs)
        archivosFinales.push(new File([blob], url)); // Usamos la URL como nombrecategoria del archivo
      });
      // Agregar archivos seleccionados al arreglo final
      if (this.selectedFiles && this.selectedFiles.length > 0) {
        this.selectedFiles.forEach((file) => {
          archivosFinales.push(file);
        });
      }
      // Agregar los valores del formulario al FormData
      const formValues = this.frmAddEditCategoria.value;
      formData.append('idCategoria', formValues.idCategoria);
      formData.append('nombreCategoria', formValues.nombreCategoria);

      // Agregar los archivos al FormData
      archivosFinales.forEach((file) => {
        formData.append('file', file, file.name);
      });
      Swal.fire({
        title: '¿Estás seguro que deseas editar esta categoria?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.categoriasService
              .updateData(
                this.idCategoria,
                formValues.nombreCategoria,
                '',
                archivosFinales
              )
              .subscribe({
                next: (response: any) => {
                  console.log('respuesta al editar', response);
                  Swal.fire(
                    '¡Editado!',
                    '¡El categoria se ha editado correctamente!',
                    'success'
                  );
                  this.loading = false;
                  this.router
                    .navigate(['/admin/categorias/listado-de-categorias'])
                    .then(() => {
                      location.reload();
                    });
                },
                error: (error: any) => {
                  console.log('error al editar categorias', error);
                  Swal.fire(
                    'Error!',
                    'Ha ocurrido un error. Inténtelo de nuevo más tarde.',
                    'error'
                  );
                },
              })
          );
        }
      });
    } else {
      this.toastr.error(
        'Ocurrió un error, revise los campos e intente nuevamente'
      );
    }
  }

  // f************************************** FUNCION PARA CARGAR FORMULARIO CON DATOS ***************************
  cargarDatosEnFormulario() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.idCategoria = id;

      if (id) {
        this.isEdit = true;
        this.mostrarSkeleton = true;
        this.categoriasService.getDataById(id).subscribe(
          (data: any) => {
            console.log('data patchvalue', data);

            const resultado = data.resultado;
            // PatchValue al formulario
            this.frmAddEditCategoria.patchValue({
              idCategoria: this.idCategoria,
              nombreCategoria: data.resultado.nombreCategoria,
              linkEnlaceMenu: data.resultado.linkEnlaceMenu,
            });

            // Cargar las imágenes si existen
            const urlImagenes = resultado.urlImagenLogo;
            if (urlImagenes) {
              this.archivos = urlImagenes
                .split(',')
                .filter((url: any) => url.trim() !== '');
            }

            this.mostrarSkeleton = false;
          },
          (error) => {
            console.error(error);
            this.mostrarSkeleton = false;
          }
        );
      }
    });
  }

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

  // F****************************************** FUNCIONES PARA MOSTRAR NOMBRECATEGORIA DE LOS ARCHIVOS *************************
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

  // f************************************** GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO ***************************
  get controlNombreCategoria(): FormControl {
    return this.frmAddEditCategoria.controls['nombreCategoria'] as FormControl;
  }
}
