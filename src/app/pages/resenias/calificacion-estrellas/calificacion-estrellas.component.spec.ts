import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionEstrellasComponent } from './calificacion-estrellas.component';

describe('CalificacionEstrellasComponent', () => {
  let component: CalificacionEstrellasComponent;
  let fixture: ComponentFixture<CalificacionEstrellasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalificacionEstrellasComponent]
    });
    fixture = TestBed.createComponent(CalificacionEstrellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
