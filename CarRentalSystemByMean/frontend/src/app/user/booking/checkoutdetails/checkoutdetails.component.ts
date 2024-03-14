import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { BiddingService } from 'src/app/services/bidding.service';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkoutdetails',
  templateUrl: './checkoutdetails.component.html',
  styleUrls: ['./checkoutdetails.component.css'],

})
export class CheckoutdetailsComponent implements OnInit {

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
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  totalday: any;
  time: any;
  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private biddingService:BiddingService,
    private userService:UserService
  ) {}

  car: any;
  id: any;
  bookingCar: any;
  rentData: any;
  rentdate: any;
  returndate: any;
  location: string = '';
  biddingvalue:any;
  monthComponent=true

  ngDoCheck()
  {

     if (this.router.url.includes('booking')) {
       this.carService.rentComponent = false;
     } else {
       this.carService.rentComponent = true;
     }
  }
  ngOnInit() {






      this.rentData =    this.carService.getRentData();
      this.rentdate = new Date(this.rentData.rentdate);
      this.returndate = new Date(this.rentData.returndate);
      this.location = this.rentData.location;
      console.log(this.location);
      let diff = this.returndate - this.rentdate;
      this.totalday = Math.ceil(diff / (1000 * 60 * 60 * 24));
      this.time = Math.abs(
        this.rentdate.getHours() - this.returndate.getHours()
      );

    this.carService.getcardetails().subscribe((data) => {
      this.car = data;
      this.route.params.subscribe((data) => {
        this.id = data['car'];
        this.carService.currentcarid = this.id;
      });
      for (let car of this.car) {
        if (car._id == this.id) {
          this.bookingCar = car;
        }
      }
    });

  this.biddingAmount= sessionStorage.getItem('bidding');

  }
  biddingAmount:any
  biddingObj={}
  biddingActive=true
  bidding(biddingAmount:any)
  {
    this.biddingAmount=biddingAmount.value
    console.log(biddingAmount.value)
    this.biddingActive=false;

       this.biddingService.carid=this.id;
       this.biddingObj = {
         amount: biddingAmount.value,
         accepted: false,
         carModel: this.bookingCar.model,
         carBrand: this.bookingCar.brand,
         actualAmount: this.bookingCar.rent * this.totalday
       };


       this.userService.addBidding(this.biddingObj).subscribe((data)=>{
           this.userService.getBiddingDetails().subscribe((data) => {
             this.biddingDetails = data;

sessionStorage.removeItem('biddingId');
sessionStorage.setItem(
  'biddingId',
  this.biddingDetails[this.biddingDetails.length - 1]._id
);
             console.log(sessionStorage.getItem('biddingId'));
           });
       })


  }

  editBidding()
  {
     this.biddingActive=true;
     sessionStorage.removeItem('bidding')

     this.biddingAmount=''

  }

  status:any
  biddingDetails:any;
  color:any

  getBidding()
  {
    if(sessionStorage.getItem('biddingId')==null)
    {

        this.status = 'Enter the bid amount';
        this.color = 'text-secondary';
    }
    else{
     this.userService.getBiddingDetailsById(sessionStorage.getItem('biddingId')).subscribe((data)=>{
          this.biddingDetails=data;
          console.log(this.biddingAmount)
          if(this.biddingAmount==null)
          {
            this.status='Enter the bid amount'
            this.color='text-secondary'
          }
          else if(this.biddingDetails.accepted=="false")
          {
              this.status="your request has been processing"
              this.color="text-warning"
          }
          else if(this.biddingDetails.accepted=="no")
          {
              this.status = 'Rejected ,your bid amount is low ';
               this.color = 'text-danger';
          }
          else
          {
              this.status = 'Accepted';
               sessionStorage.setItem('bidding', this.biddingDetails.amount);
               this.color = 'text-success';

          }


     })
    }
  }



}
