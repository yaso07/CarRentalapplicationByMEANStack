import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CarService } from './car.service';

@Injectable({
  providedIn: 'root',
})
export class AvailableCarsService {
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
  availableCars=[]
  constructor(private user: UserService, private car: CarService) {}
  totalBookings: number;
  carCount:number
  getAvailableCars(rentDate: any, returnDate: any,location:string) {
    rentDate = new Date(rentDate);
    returnDate = new Date(returnDate);
    let year = Math.abs(rentDate.getYear() - returnDate.getYear());
    let totalMonths = Math.abs(rentDate.getMonth() - returnDate.getMonth());
    let months = [];
    console.log(year);
    if (year == 0) {
      for (
        let number = rentDate.getMonth();
        number <= returnDate.getMonth();
        number++
      ) {
        months.push(this.months[number]);
      }
    } else if (year == 1) {
      for (let number = rentDate.getMonth(); number <= 11; number++) {
        months.push(this.months[number]);
      }
      totalMonths = returnDate.getMonth();
      for (
        let number = 0;
        number <= returnDate.getMonth() && number < rentDate.getMonth();
        number++
      ) {
        console.log(number);
        months.push(this.months[number]);
      }
    } else {
      months = this.months;
    }
    console.log(months);
    let bookings;
    let filteredBookings = [];
    this.user.getBookingsByLocation(location).subscribe((data) => {
      bookings = data;
      bookings.forEach((element) => {
        months.forEach((month) => {
          if (
            element.rentDate.includes(month) ||
            element.returnDate.includes(month)
          ) {
            filteredBookings.push(element);
          }
        });
      });
      let carDetails:any;
      let availabeCars = [];

      this.car.getcardetails().subscribe((data) => {
        carDetails = data;
        let carModels = [];
        let carCount = [];
        carDetails.forEach((car) => {
          carModels.push(car.model);
          carCount.push({ model: car.model, carCount: car.carCount });
        });

        filteredBookings.filter((booking) => {

          let available=0;

          if (
            carModels.includes(booking.Model) &&
            !(availabeCars.includes(booking.Model) || availabeCars.includes(booking.Model+" not available"))
          ) {
            let totalBookings = bookings.filter(
              (data) => booking.Model == data.Model
            );



            let car = carCount.filter((data) => data.model == booking.Model);
            this.totalBookings = parseInt(totalBookings.length);
            this.carCount = parseInt((car[0].carCount).toString());
        console.log(car[0].model+ ' : ' + this.carCount);
        console.log('total bookings : ' + totalBookings.length);


            if (this.carCount>this.totalBookings ) {
              console.log('available');
              availabeCars.push(car[0].model);
            }
            else
            {

              let bookingCount=totalBookings.length;
                  for(let number=0;number<totalBookings.length;number++)
                  {

                          let date1=new Date(totalBookings[number].rentDate);
                          let date2;
                          if(totalBookings[number].CurrentReturnDate)
                          {
                                      let date2 = new Date(
                                        totalBookings[number].CurrentReturnDate
                                      );
                          }
                          else
                          {
                             date2=new Date(totalBookings[number].returnDate);
                          }
                          console.log(rentDate,returnDate)
                          console.log(date1,date2)
                          console.log(
                            (rentDate < date1 && returnDate < date1) ||
                              (rentDate > date2 && returnDate > date2)
                          );
                          if(rentDate<date1 && returnDate<date1 || rentDate>date2 && returnDate>date2)
                          {
                              console.log("enter")
                              available++;

                              bookingCount--;
                          }
                          else
                          {
                             let temp=this.carCount
                              if(available>0)
                              {
                                available--
                              }
                          }
                  }
                   if (available > 0 || bookingCount<this.carCount) {
                     availabeCars.push(car[0].model);
                   } else {
                     console.log('not available');
                     availabeCars.push(car[0].model+" not available");
                   }

              }





          }
        });


        let result=[]
        carModels.forEach((carModel)=>{

            if(!(availabeCars.includes(carModel+' not available')))
            {
                 result.push(carModel)
            }
        })

         this.availableCars=result
      });
    });
  }
}
