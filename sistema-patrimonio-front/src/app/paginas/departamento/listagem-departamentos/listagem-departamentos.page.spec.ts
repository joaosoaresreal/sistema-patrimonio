import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemDepartamentosPage } from './listagem-departamentos.page';

describe('ListagemDepartamentosPage', () => {
  let component: ListagemDepartamentosPage;
  let fixture: ComponentFixture<ListagemDepartamentosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListagemDepartamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
