import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ReseniasService } from 'src/app/services/resenias/resenias.service';

@Component({
  selector: 'app-mala-calificacion',
  templateUrl: './mala-calificacion.component.html',
  styleUrls: ['./mala-calificacion.component.css'],
})
export class MalaCalificacionComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  estrellasSeleccionadas: number = 0;

  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private reseniaService: ReseniasService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      idResenia: [0],
      cantEstrellas: ['', Validators.required],
      detalleResenia: '',
      celular: '',
      nombreCompleto: '',
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  seleccionarEstrellas(cantidad: number) {
    this.estrellasSeleccionadas = cantidad;
    this.formulario.patchValue({ cantEstrellas: cantidad });
  }

  // cargarResenia() {
  //   this.subscription.add(
  //     this.reseniaService.addResenia(this.formulario.value).subscribe({
  //       next: () => {
  //         console.log(this.formulario.value);
  //         this.toastr.success('Su reseña se ha enviado con éxito');
  //         setTimeout(() => {
  //           location.reload();
  //         }, 200);
  //         this.router.navigate(['/ver-menu']);
  //       },
  //       error: (error: any) => {
  //         this.toastr.error(
  //           'Ha ocurrido un error. Espere e intente nuevamente.'
  //         );
  //       },
  //     })
  //   );
  // }
  cargarResenia() {
    if (!this.formulario.value.cantEstrellas) {
      this.toastr.error('Por favor selecciona una cantidad de estrellas.');
      return;
    }

    this.subscription.add(
      this.reseniaService.addResenia(this.formulario.value).subscribe({
        next: () => {
          console.log('✅ Datos enviados:', this.formulario.value);
          this.toastr.success('Su reseña se ha enviado con éxito');
          setTimeout(() => {
            location.reload();
          }, 200);
          this.router.navigate(['/ver-menu']);
        },
        error: (error: any) => {
          console.error('❌ Error al enviar la reseña:', error);
          this.toastr.error(
            'Ha ocurrido un error. Espere e intente nuevamente.'
          );
        },
      })
    );
  }

  get controlNombre(): FormControl {
    return this.formulario.controls['nombre'] as FormControl;
  }

  get controlDatoClient(): FormControl {
    return this.formulario.controls['celularoemail'] as FormControl;
  }

  get controlOpinion(): FormControl {
    return this.formulario.controls['detalleResenia'] as FormControl;
  }

  get controlCantEstrellas(): FormControl {
    return this.formulario.controls['cantEstrellas'] as FormControl;
  }
}
