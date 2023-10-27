import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPatrimonioPage } from './editar-patrimonio.page';

describe('EditarPatrimonioPage', () => {
  let component: EditarPatrimonioPage;
  let fixture: ComponentFixture<EditarPatrimonioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarPatrimonioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
