import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css'],
})
export class UserBookingsComponent implements OnInit {
  constructor(
    private admin: AdminService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  userId: number;
  userBookings: any;
  user: any;
  currentNav = 'processing';
  booking: any;
  count: any;
  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.userId = data['userId'];
      this.admin.getUserBookingDetails(this.userId).subscribe((data) => {
        this.userBookings = data;
        console.log(this.userBookings);
        this.booking = this.userBookings[0];
        this.admin.getUserById(this.userId).subscribe((data) => {
          this.user = data;
          this.user = this.user[0];
          console.log(this.user);
        });
      });
    });
  }

  confirmBooking(bookingId: any, userId: any) {
    let object = { currentStatus: 'confirmed' };
    this.userService.updateBookingStatus(bookingId, object).subscribe((data) => {
      //     this.userBookings=data
      this.admin.getUserBookingDetails(this.userId).subscribe((data) => {
        console.log(data);
        this.userBookings = data;
      });
    });

    setTimeout(() => {
      //  location.reload()
      //  this.router.navigate(['../../bookings/'+this.userId],{relativeTo:this.activatedRoute})
    }, 6000);
  }

  declineBooking(bookingId: any, userId: any){

     let object = { currentStatus: 'declined' };
     this.userService.updateBookingStatus(bookingId, object).subscribe((data) => {
       //     this.userBookings=data
       this.admin.getUserBookingDetails(this.userId).subscribe((data) => {
         console.log(data);
         this.userBookings = data;
       });
     });
  }
  selectedCard(booking: any) {
    this.booking = booking;
    console.log(this.booking);
  }
}
