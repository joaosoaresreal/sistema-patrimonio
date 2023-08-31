import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemUsuariosPage } from './listagem-usuarios.page';

describe('ListagemUsuariosPage', () => {
  let component: ListagemUsuariosPage;
  let fixture: ComponentFixture<ListagemUsuariosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListagemUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
