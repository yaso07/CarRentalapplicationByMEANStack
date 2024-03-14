import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { RefundService } from 'src/app/services/refund.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css'],
  providers: [RefundService],
})
export class MybookingsComponent implements OnInit {
  constructor(
    private router: Router,
    public user: UserService,
    private carService: CarService,
    public refund: RefundService
  ) {}
  bookingDetails: any = [];
  userdetails: any;
  membershipType: any;

  processing = 'text-warning';

  confirmed = 'text-success';

  declined = 'text-danger';
  accountNo: any;
  ifsc: any;
  refundTerms = false;

  @ViewChild('accountDetails') account: NgForm;

  ngOnInit() {
    this.getBookings();
    if (this.router.url.includes('bookings')) {
      console.log('called');
      this.carService.rentComponent = false;
    } else {
      this.carService.rentComponent = true;
    }

    this.user.getUserById().subscribe((data) => {
      this.userdetails = data;
    setTimeout(()=>{this.account.form.patchValue({
      accountNo: this.userdetails.accountDetails.accountNo,
      ifsc: this.userdetails.accountDetails.ifsc
    });},3000)
      this.membershipType=this.userdetails.subscription;
      if (this.membershipType == 'standard') {
      }
    });
  }
  ngDoCheck() {
    if (this.router.url.includes('bookings')) {
      this.carService.rentComponent = false;
    } else {
      this.carService.rentComponent = true;
    }
  }

  cancelBooking(id: number) {
    console.log(this.account.controls['ifsc'].value.toString().toUpperCase());
    let account = { accountDetails:{accountNo: this.accountNo, ifsc: this.ifsc.toUpperCase() }};
    this.user.updateAccountDetails(account).subscribe((data) => {
      let date = new Date();
      let currentdate =
        this.user.weekDays[date.getDay()] +
        ' ' +
        date.getDate() +
        ' ' +
        this.user.months[date.getMonth()] +
        ' ' +
        date.getFullYear();

      let object = {
        currentStatus: 'cancelled',
        cancelledDate: currentdate,
        refund:{
        refundStatus: 'processing',
        refundAmount: this.refund.refundAmount
        }
      };
      this.user.updateBookingStatus(id, object).subscribe((data) => {
        this.getBookings();
      });
    });
  }

  getBookings() {
    this.user.getBookingDetails().subscribe((data) => {
      this.bookingDetails = data;
      let currentDate = new Date();
      let date =
        this.user.weekDays[currentDate.getDay()] +
        ' ' +
        currentDate.getDate() +
        ' ' +
        this.user.months[currentDate.getMonth()] +
        ' ' +
        currentDate.getFullYear();

      for (let booking of this.bookingDetails) {
        if (date == booking.rentDate) {
          console.log('true' + booking.rentDate);
          let object = { currentStatus: 'delivered' };
          this.user.updateBookingStatus(booking._id, object).subscribe(() => {
            this.bookingDetails.pop(booking._id);
          });
        }
      }
    });
  }
  logout() {
    sessionStorage.removeItem('name');
    this.router.navigate(['/home']);
  }
  bookingId: any;
  setBookingId(id: any, bookingData: any) {
    this.bookingId = id;
    this.account.reset();
    this.refundTerms = false;
    this.refund.refund(bookingData, this.router.url);
  }

  changeView() {
    if (this.refundTerms) {
      this.refundTerms = false;
    } else {
      this.refundTerms = true;
    }
  }
}
