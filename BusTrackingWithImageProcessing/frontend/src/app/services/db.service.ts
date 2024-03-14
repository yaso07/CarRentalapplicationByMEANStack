import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private  http: HttpClient) {}
  busUrl = 'http://localhost:3400/user/buses';
  busDetails() {
        return  this.http.get(this.busUrl);
  }
}
