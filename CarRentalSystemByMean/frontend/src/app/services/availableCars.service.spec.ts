/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AvailableCarsService } from './availableCars.service';

describe('Service: AvailableCars', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailableCarsService]
    });
  });

  it('should ...', inject([AvailableCarsService], (service: AvailableCarsService) => {
    expect(service).toBeTruthy();
  }));
});
