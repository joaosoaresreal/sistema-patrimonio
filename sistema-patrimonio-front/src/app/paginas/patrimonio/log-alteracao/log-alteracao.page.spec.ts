import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogAlteracaoPage } from './log-alteracao.page';

describe('LogAlteracaoPage', () => {
  let component: LogAlteracaoPage;
  let fixture: ComponentFixture<LogAlteracaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogAlteracaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
