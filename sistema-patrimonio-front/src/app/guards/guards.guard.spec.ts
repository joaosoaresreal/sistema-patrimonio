import { TestBed } from '@angular/core/testing';

import { Guards } from './guards.guard';

describe('GuardsGuard', () => {
  let guard: Guards;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Guards);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
