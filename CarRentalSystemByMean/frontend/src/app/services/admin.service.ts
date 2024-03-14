import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  userUrl = 'http://localhost:3200/api/user';

  constructor(private http: HttpClient) {}

  bookingUrl = 'http://localhost:3200/api/booking';

  getUserById(userId: any) {

    return this.http.get(this.userUrl+"?id="+userId);
  }

  getAdminLogged() {
    return sessionStorage.getItem('admin') == 'yaso' ? true : false;
  }
  getUserBookingDetails(userId: any): any {
    return this.http.get(
      this.bookingUrl + '?userId=' + userId + '&sort=-_id'
    );
  }
}
