import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferirPatrimonioPage } from './transferir-patrimonio.page';

describe('TransferirPatrimonioPage', () => {
  let component: TransferirPatrimonioPage;
  let fixture: ComponentFixture<TransferirPatrimonioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransferirPatrimonioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
