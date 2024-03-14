import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
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

  id: any;
  bookingCar: any;
  rentData: any;
  rentdate: any;
  returndate: any;
  location: any;
  totalday: any;
  time: any;
  userList: any;
  cardNumber: string = '';
  biddingAmount: any;
  carRent:number;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private user: UserService,
    private form: FormBuilder
  ) {}
  ngDoCheck() {
    if (this.router.url.includes('payment')) {
      this.carService.rentComponent = false;
    } else {
      this.carService.rentComponent = true;
    }
  }

  disableHtmlElements = true;
  car: any;
  ngOnInit() {




      this.rentData = this.carService.getRentData()
       if (this.router.url.includes('car-for-month')) {
      this.disableHtmlElements = false;
      this.rentdate=new Date();
      this.rentdate.setDate(this.rentdate.getDate()+1)

    }
    else{

      this.rentdate = new Date(this.rentData.rentdate);
      this.returndate = new Date(this.rentData.returndate);
    }
      this.location = this.rentData.location;
      let diff = this.returndate - this.rentdate;
      this.totalday = Math.ceil(diff / (1000 * 60 * 60 * 24));
      this.time = Math.abs(
        this.rentdate.getHours() - this.returndate.getHours()
      );

    this.carService.getcardetails().subscribe((data) => {
      this.car = data;
      this.route.params.subscribe((data) => {
        this.id = data['id'];
        this.carService.currentcarid = this.id;
      });
      for (let car of this.car) {
        if (car._id == this.id) {
          this.bookingCar = car;

          this.carRent=parseInt(localStorage.getItem('totalAmount'));


        }

      }

      setInterval(()=>{
             this.user.getUserById().subscribe((data) => {
               this.userList = data;
             });

      },1000)

    });

    this.biddingAmount = sessionStorage.getItem('bidding');

  }



  payment = this.form.group({
    holderName: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expireDate: ['', Validators.required],
    cvv: ['', Validators.required],
  });
  monthValue=1;
  totalDays=30;
  addAndReduceMonth(value:any)
  {
      var actualAmount = parseInt(localStorage.getItem('totalAmount'));
     if(value=='add' && this.monthValue<12)
     {
        this.monthValue++;
        this.carRent=this.carRent+actualAmount;
        this.totalDays=this.totalDays+30
     }
     else if(value!='add' && this.monthValue>1)
     {

           this.monthValue--;
              this.carRent = this.carRent-actualAmount;
                this.totalday = this.totalday - 30;


     }
     let date=new Date();

     console.log(date)
  }

  value = 4;
  currentLength = this.cardNumber.length;
  validateCard(value: HTMLInputElement) {
    var temp = this.currentLength;

    this.currentLength = this.cardNumber.replaceAll(' ', '').length;
    if (this.currentLength > temp) {
      this.value++;
    } else if (this.currentLength <= temp) {
      this.value--;
    }

    if (
      value.value.replaceAll(' ', '').length % 4 == 0 &&
      temp < this.currentLength
    ) {
      value.value = value.value.concat(' ').toString();
    }
  }

  booking: any;
  addBooking() {
    let totalcost;
    if(this.router.url.includes('car-for-month'))
    {
        totalcost=this.carRent;

        this.returndate=new Date()
        this.returndate.setDate(this.returndate.getDate()+this.totalDays);


    }
    else if (this.biddingAmount == null) {
      totalcost = this.totalday * this.bookingCar.rent + 300;
    } else {
      totalcost = this.biddingAmount * 1 + 300;
    }

   let date=new Date();
    this.booking = {
      carId:this.bookingCar._id,
      userId: sessionStorage.getItem('id'),
      brand: this.bookingCar.brand,
      model: this.bookingCar.model,
      rentDate:
        this.days[this.rentdate.getDay()] +
        ' ' +
        this.rentdate.getDate() +
        ' ' +
        this.months[this.rentdate.getMonth()] +
        ' ' +
        this.rentdate.getFullYear(),
      returnDate:
        this.days[this.returndate.getDay()] +
        ' ' +
        this.returndate.getDate() +
        ' ' +
        this.months[this.returndate.getMonth()] +
        ' ' +
        this.returndate.getFullYear(),

      location: this.location,
      totalDays: this.totalday,
      totalCost: totalcost,
      reservedDate:
        this.days[date.getDay()] +
        ' ' +
        date.getDate() +
        ' ' +
        this.months[date.getMonth()] +
        ' ' +
        date.getFullYear(),
      status:"processing"
    };
    console.log(this.booking);
    this.user.addBooking(this.booking).subscribe((data) => {


    });
       if(this.router.url.includes('car-for-month'))
       {

            setTimeout(() => {
              this.router.navigate(['../../../mybookings'], { relativeTo: this.route });
            }, 5000);
       }
       else

       {
       setTimeout(() => {

          this.router.navigate(['../../mybookings'],{relativeTo:this.route})
       }, 5000);
      }

  }
 // @ViewChild('active') active:HTMLElement
  canExit()
  {


    if(this.payment.valid)
    {

      return true;
    }
    else
    {
        return confirm("Are you sure to leave this page")
    }
  }

}
