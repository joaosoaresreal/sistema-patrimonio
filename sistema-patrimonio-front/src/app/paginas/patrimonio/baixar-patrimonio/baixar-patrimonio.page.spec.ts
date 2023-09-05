import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaixarPatrimonioPage } from './baixar-patrimonio.page';

describe('BaixarPatrimonioPage', () => {
  let component: BaixarPatrimonioPage;
  let fixture: ComponentFixture<BaixarPatrimonioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BaixarPatrimonioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
