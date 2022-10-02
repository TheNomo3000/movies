import { TestBed } from '@angular/core/testing';

import { CheckCertificationGuard } from './check-certification.guard';

describe('CheckCertificationGuard', () => {
  let guard: CheckCertificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckCertificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
