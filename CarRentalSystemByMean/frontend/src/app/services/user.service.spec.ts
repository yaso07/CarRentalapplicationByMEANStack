/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {

  let service:UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [UserService]
    });
  });

 it('should be created', () => {
   service = TestBed.inject(UserService);
   expect(service).toBeTruthy();
 });
});
