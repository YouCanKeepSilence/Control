import { TestBed, inject } from '@angular/core/testing';

import { WorklistService } from './worklist.service';

describe('WorklistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorklistService]
    });
  });

  it('should be created', inject([WorklistService], (service: WorklistService) => {
    expect(service).toBeTruthy();
  }));
});
