import { Injectable } from '@angular/core';
import { CarService } from './car.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RefundService {
  constructor(public user: UserService, private car: CarService) {}

  bookingDetails: any;
  carDetails: any;
  days: any;
  bookingId: number;
  refundAmount: any;
  reservedDate: any;

  ngOnInit() {
    this.user.getBookingDetails().subscribe((data) => {
      console.log(data);
      this.bookingDetails = data;

      this.car.getcardetails().subscribe((data) => {
        this.carDetails = data;
      });
    });
  }
  refund(bookingData: any,url:any) {
    let reservedDate = new Date(bookingData.reservedDate);

    let cancelledDate;
    if(url.includes('mybookings'))
    {
            let now = new Date();
            cancelledDate =new Date();

    }
    else
    {
      cancelledDate = new Date(bookingData.cancelledDate);
    }

    let rentDate = new Date(bookingData.rentDate);
    this.bookingId = bookingData._id;
    this.reservedDate =
      this.user.weekDays[reservedDate.getDay()] +
      ' ' +
      reservedDate.getDate() +
      ' ' +
      this.user.months[reservedDate.getMonth()] +
      ' ' +
      reservedDate.getFullYear();


     console.log("jjj"+ this.bookingId)
    this.bookingId = bookingData._id;
    console.log(bookingData)
    let date = new Date(bookingData.rentDate);

    let difference = rentDate.getTime() - reservedDate.getTime();
    let difference2 = cancelledDate.getTime() - reservedDate.getTime();
    //    console.log(Math.floor(difference2 / (1000 * 60 * 60 * 24)))
    difference2 = Math.floor(difference2 / (1000 * 60 * 60 * 24));
    console.log('difference :' + difference2);

    this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    //console.log('total days:' + this.days);
    this.days = Math.abs(this.days - difference2);
   // console.log('remaining:' + this.days);

    if (difference2 < this.days && difference2 <= 2) {
      this.user.refundStatus = 'full amount will be refund';
      this.refundAmount = bookingData.totalCost;
    } else if (difference2 > 2 && difference2 <= this.days) {
      this.refundAmount =
        bookingData.totalCost - (bookingData.totalCost * 20) / 100;
      this.user.refundStatus = '80% of amount will be refund ';
    } else {
      this.refundAmount =
        bookingData.totalCost - (bookingData.totalCost * 30) / 100;
      this.user.refundStatus = '70% of amount only refund';
    }
  }

  return()
  {

  }
}
