/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RefundService } from './refund.service';

describe('Service: Refund', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefundService]
    });
  });

  it('should ...', inject([RefundService], (service: RefundService) => {
    expect(service).toBeTruthy();
  }));
});
