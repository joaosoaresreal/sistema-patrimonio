import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarUsuarioPage } from './cadastrar-usuario.page';

describe('CadastrarUsuarioPage', () => {
  let component: CadastrarUsuarioPage;
  let fixture: ComponentFixture<CadastrarUsuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastrarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
