import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeuUsuarioPage } from './meu-usuario.page';

describe('MeuUsuarioPage', () => {
  let component: MeuUsuarioPage;
  let fixture: ComponentFixture<MeuUsuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MeuUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
