import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarDepartamentoPage } from './cadastrar-departamento.page';

describe('CadastrarDepartamentoPage', () => {
  let component: CadastrarDepartamentoPage;
  let fixture: ComponentFixture<CadastrarDepartamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastrarDepartamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
