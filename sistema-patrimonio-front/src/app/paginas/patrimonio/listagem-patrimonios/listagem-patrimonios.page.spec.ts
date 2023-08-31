import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemPatrimoniosPage } from './listagem-patrimonios.page';

describe('ListagemPatrimoniosPage', () => {
  let component: ListagemPatrimoniosPage;
  let fixture: ComponentFixture<ListagemPatrimoniosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListagemPatrimoniosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
