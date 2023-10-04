import { TestBed } from '@angular/core/testing';

import { AuthfakeService } from './authfake.service';

describe('AuthfakeService', () => {
  let service: AuthfakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthfakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
