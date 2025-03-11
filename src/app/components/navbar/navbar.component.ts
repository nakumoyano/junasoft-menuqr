import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isScrolled: boolean = false;
  sidebarOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.addSmoothScroll();
  }

  @HostListener('window:scroll')
  onScroll() {
    if (window.pageYOffset > 0) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  addSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = anchor.getAttribute('href')!.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
          });
        }
      });
    });
  }

  closeMenu() {
    this.sidebarOpen = false;
  }

  toggleSidebar() {
    // Alternar el estado del sidebar
    this.sidebarOpen = !this.sidebarOpen;
  }
}
