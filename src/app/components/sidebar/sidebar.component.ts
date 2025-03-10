import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class SidebarComponent implements OnInit {
  currentUrl: string = '';

  user: any;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    // private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
      }
    });
  }

  ngOnInit(): void {
    // // this.obtenerDatos();
    // this.authService.getCurrentUser().subscribe((user) => {
    //   this.user = user;
    //   // console.log('datos del usuario actual', user);
    // });
  }

  // Mantén un registro del estado de los menús desplegables
  dropdownStates: { [key: string]: boolean } = {
    'dropdown-categorias': false,
    'dropdown-productos': false,
  };

  toggleDropdown(id: string) {
    this.dropdownStates[id] = !this.dropdownStates[id];
  }

  isDropdownOpen(id: string) {
    // Devuelve el estado del menú desplegable
    return this.dropdownStates[id];
  }

  confirm1() {
    // this.confirmationService.confirm({
    //   message: '¿Está seguro que desea cerrar sesión?',
    //   header: 'Confirmación',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.authService.logout().subscribe(
    //       (resultado: any) => {
    //         if (resultado && resultado.isExitoso) {
    //           console.log('resultado logout', resultado);
    //           this.toastr.success('Sesión cerrada exitosamente');
    //           this.router.navigate(['/admin/login']); // O a la página que desees después del logout
    //         } else {
    //           // Manejar la respuesta del servidor si no hay un resultado específico
    //           this.toastr.warning('No se pudo cerrar la sesión');
    //         }
    //       },
    //       (error) => {
    //         // console.error(error);
    //         this.toastr.error(
    //           'Error al cerrar sesión. Por favor, inténtelo de nuevo.'
    //         );
    //       }
    //     );
    //   },
    //   reject: () => {
    //     this.messageService.add({
    //       severity: 'warn',
    //       summary: 'Cancelado',
    //       detail: '¡Has cancelado!',
    //     });
    //   },
    //   acceptButtonStyleClass: 'p-button-text custom-yes-button',
    //   rejectButtonStyleClass: 'p-button-text custom-no-button',
    // });
  }

  sidebarOpen: boolean = false;
  toggleSidebar() {
    // Alternar el estado del sidebar
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    // Cerrar el sidebar
    this.sidebarOpen = false;
  }

  logout() {
    // this.authService.logout().subscribe(
    //   () => {
    //     this.toastr.success('Sesión cerrada exitosamente');
    //     this.router.navigate(['/admin/login']);
    //   },
    //   (error) => {
    //     this.toastr.error(
    //       'Error al cerrar sesión. Por favor, inténtelo de nuevo.'
    //     );
    //   }
    // );
  }

  // d*************************************** FUNCINO PARA ACTIVA EL LINK ****************************
  isLinkActive(links: string[]): boolean {
    return links.some((link) => this.currentUrl.startsWith(link));
  }
}
