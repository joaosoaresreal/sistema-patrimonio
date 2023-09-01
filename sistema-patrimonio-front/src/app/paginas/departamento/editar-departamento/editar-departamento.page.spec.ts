import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarDepartamentoPage } from './editar-departamento.page';

describe('EditarDepartamentoPage', () => {
  let component: EditarDepartamentoPage;
  let fixture: ComponentFixture<EditarDepartamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarDepartamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
