import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  userUrl = 'http://localhost:3200/api/user';

  bookingUrl = 'http://localhost:3200/api/booking';
  biddingUrl = 'http://localhost:3200/api/bidding';

  constructor(private http: HttpClient, private router: Router) {}
  userLogged: any;
  currentUserId: any;
  refundStatus: any;
  addUser(user: any) {
    console.log(user);
    return this.http.post(this.userUrl, user);
  }
  getUser() {
    return this.http.get(this.userUrl);
  }

  // getUserBName(name: any) {
  //   return this.http.get(this.userUrl + '?username=' + name);
  // }
  getUserById() {
      if(sessionStorage.getItem('id')==null)
      {
         return new Observable();
      }
      else
      {
    return this.http.get(this.userUrl + '/' + sessionStorage.getItem('id'))
      }
  }

  getUserLogged() {
    return sessionStorage.getItem('name') == null ? false : true;
  }

  updateUserdetails(value: any, id: any) {
    return this.http.patch(this.userUrl + '/' + id, value);
  }

  addBooking(bookingDetails: any) {
    return this.http.post(this.bookingUrl, bookingDetails);
  }
  getBookings() {
    return this.http.get(this.bookingUrl);
  }
  getBookingsByLocation(location:string)
  {
    console.log(location)
     return this.http.get(this.bookingUrl+'?location='+location)
  }
  getBookingDetails() {
    return this.http.get(
      this.bookingUrl +
        '?_id=' +
        sessionStorage.getItem('id') +
        '&sort=-_id'
    );
  }
  updateBookingStatus(bookingId: number, object: any) {
    console.log(object);
    return this.http.patch(this.bookingUrl + '/' + bookingId, object);
  }
  addBidding(biddingobj: any) {
    return this.http.post(this.biddingUrl, biddingobj);
  }
  getBiddingDetails(){
    return this.http.get(this.biddingUrl);
  }
  updateBiddingDetails(id: any, value: any) {
    return this.http.patch(this.biddingUrl + '/' + id, value);
  }
  getBiddingDetailsById(id: any) {
    return this.http.get(this.biddingUrl + '/' + id);
  }
  getBiddingDetailsDesc() {
    return this.http.get(this.biddingUrl+'?sort=-_id');
  }
  getPaymentActive() {
    console.log(this.router.url);
    if (this.router.url == '/') {
      return true;
    }
    return this.router.url.includes('Booking') ||
      this.router.url.includes('car-for-month') ||
      this.router.url.includes('car') ||
      this.router.url.includes('payment')
      ? true
      : false;
  }
  updateAccountDetails(accountDetails) {
    return this.http.patch(this.userUrl+"/"+sessionStorage.getItem('id'),accountDetails)
  }

}


