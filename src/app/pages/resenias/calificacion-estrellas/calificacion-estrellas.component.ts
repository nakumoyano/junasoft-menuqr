import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calificacion-estrellas',
  templateUrl: './calificacion-estrellas.component.html',
  styleUrls: ['./calificacion-estrellas.component.css'],
})
export class CalificacionEstrellasComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirigirSegunSeleccion(seleccion: number) {
    if (seleccion <= 3) {
      this.router.navigate(['/mejorar-puntuacion']);
    } else {
      this.router.navigate([
        // 'https://www.google.com/search?q=oslo+beer+and+food&sca_esv=561082500&sxsrf=AB5stBiCK400Xu-vOrXWvv6piyrQd00new%3A1693341111069&ei=t1XuZJzpA5iY1sQPtaqBkAM&oq=oslo+&gs_lp=Egxnd3Mtd2l6LXNlcnAiBW9zbG8gKgIIADIHECMYigUYJzIKEC4YsQMYigUYQzINEC4YigUYxwEYrwEYQzIHEAAYigUYQzIHEAAYigUYQzIHEAAYigUYQzIFEAAYgAQyBxAAGIoFGEMyBRAAGIAEMgcQABiKBRhDSI0QUOMIWOMIcAJ4AZABAJgBcaABcaoBAzAuMbgBAcgBAPgBAcICChAAGEcY1gQYsAPCAgoQABiKBRiwAxhDwgIOEAAY5AIY1gQYsAPYAQHCAhAQLhiKBRjIAxiwAxhD2AEC4gMEGAAgQYgGAZAGE7oGBggBEAEYCboGBggCEAEYCA&sclient=gws-wiz-serp#lrd=0x942d513557cc58ff:0x7724d4b6e5060bc6,3',
      ]);
    }
  }
}
