import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { RefundService } from 'src/app/services/refund.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css'],
})
export class BookingHistoryComponent implements OnInit {
  bookingDetails=[];
  carDetails: any;
  accountNo: any;
  ifsc: any;
  userdetails: any;

  constructor(
    public refund: RefundService,
    public user: UserService,
    private car: CarService,
    private router: Router
  ) {}

  @ViewChild('accountDetails') account:NgForm
  ngOnInit() {


    this.user.getUserById().subscribe((data) => {
      this.userdetails = data;

      setTimeout(() => {
        this.account.form.patchValue({
          accountNo: this.userdetails.accountDetails.accountNo,
          ifsc:this.userdetails.accountDetails.ifsc,
        });
      }, 3000);
    });
    this.user.getBookingDetails().subscribe((data) => {
      console.log(data);
      let bookings:any= data;
      for(let booking of bookings)
      {
         console.log(booking.status)
          if((booking.currentStatus=='cancelled' || booking.currentStatus=='delivered'))
          {
              console.log(booking)
              this.bookingDetails.push(booking)
          }

      }
      console.log(this.bookingDetails.length)
      this.car.getcardetails().subscribe((data) => {
        this.carDetails = data;
      });
    });
  }
  ngDoCheck() {
    if (this.router.url.includes('bookings')) {
      this.car.rentComponent = false;
    } else {
      this.car.rentComponent = true;
    }
  }
  refundAmount: any;
  returnDate: any;
  currentReturnDate: Date;
  booking: any;
  startDate: any;
  return(booking: any) {
    setInterval(() => {
      let date = new Date(this.currentReturnDate);
      let rentDate = new Date(this.booking.rentDate);
      let difference2 = Math.abs(date.getTime() - rentDate.getTime());
      let days = Math.floor(difference2 / (1000 * 60 * 60 * 24));
      this.car.getCarDetailsByModel(this.booking.model).subscribe((data) => {
        let car = data[0];
        let count =
          days <= 0 ? parseInt(car.rent) * 1 : parseInt(car.rent) * days;
        let refundAmount = this.booking.totalCost - count;
        this.refundAmount = refundAmount;
        this.bookingId = this.booking._id;
      });
    }, 1000);
    this.currentReturnDate = undefined;
    this.booking = booking;
    let date = new Date(booking.returnDate);

    let presentDate=new Date()
    this.startDate =
      presentDate.getFullYear() +
      '-' +
      (presentDate.getMonth() <=8 ? '0' + (presentDate.getMonth()+1) : presentDate.getMonth()+1) +
      '-' +
      (presentDate.getDate() <=8 ? '0' + presentDate.getDate()+1 : presentDate.getDate()+1) +
      ' ' +
      (presentDate.getHours() <10 ? '0' + presentDate.getHours() : presentDate.getHours()) +
      ':' +
      (presentDate.getMinutes() < 10 ? '0' + presentDate.getMinutes() : presentDate.getMinutes());
       console.log(this.startDate)
      this.returnDate =
        date.getFullYear() +
        '-' +
        (date.getMonth() <=8 && date.getDate()-1 >0
          ? '0' + (date.getMonth()+1)
          :date.getMonth()>=9
          ?date.getMonth()+1
          : '0'+(date.getMonth())) +
        '-' +
        ((date.getDate()-1 )<=0
          ? '30'
          : date.getDate() <=8
          ? '0' + (date.getDate() - 1)
          : date.getDate() - 1) +
        ' ' +
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ':' +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

    console.log(this.returnDate);
  }

  bookingId: any;
  setBookingId(id: any) {
    this.bookingId = id;
  }
  bookingStatus() {
    let object = {
      refund:{
      refundAmount: this.refundAmount,
      returnDate: this.currentReturnDate,
      refundStatus: 'processing'
      }

    };

    this.user.updateBookingStatus(this.bookingId, object).subscribe((data) => {
      location.reload();
    });
  }
}
