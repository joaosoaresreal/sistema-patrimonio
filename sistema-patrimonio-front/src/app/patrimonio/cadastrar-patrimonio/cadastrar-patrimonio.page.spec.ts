import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarPatrimonioPage } from './cadastrar-patrimonio.page';

describe('CadastrarPatrimonioPage', () => {
  let component: CadastrarPatrimonioPage;
  let fixture: ComponentFixture<CadastrarPatrimonioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastrarPatrimonioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
