/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RentInputFormServiceService } from './rentInputFormService.service';

describe('Service: RentInputFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentInputFormServiceService]
    });
  });

  it('should ...', inject([RentInputFormServiceService], (service: RentInputFormServiceService) => {
    expect(service).toBeTruthy();
  }));
});
