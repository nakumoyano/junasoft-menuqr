import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalaCalificacionComponent } from './mala-calificacion.component';

describe('MalaCalificacionComponent', () => {
  let component: MalaCalificacionComponent;
  let fixture: ComponentFixture<MalaCalificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MalaCalificacionComponent]
    });
    fixture = TestBed.createComponent(MalaCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
