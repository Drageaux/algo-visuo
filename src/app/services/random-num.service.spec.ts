import { TestBed } from '@angular/core/testing';

import { RandomNumService } from './random-num.service';

describe('RandomNumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomNumService = TestBed.get(RandomNumService);
    expect(service).toBeTruthy();
  });
});
