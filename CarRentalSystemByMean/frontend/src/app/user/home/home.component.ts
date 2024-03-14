import { Component ,ElementRef,Input, ViewChild} from '@angular/core';


import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  image = '/assets/car image.jpg';
  constructor(public carService: CarService,
    private router:Router,
    private user:UserService,
    ) {


  }
  membership:any
  userDetail:any
  ngOnInit()
  {


     this.user.getUserById().subscribe((data)=>{
         this.userDetail=data
        this.membership=this.userDetail.subscription;

        console.log(this.userDetail.subscription)
     })
  }
  days:any
  hours:any
  minutes:any
  seconds:any
  timeInterval:any;



  ngAfterViewInit()
  {
      var endDate=this.carService.offerEndsDate;

      this.timeInterval=setInterval(()=>{
        let currentDate = new Date();

        let endTime = endDate.getTime();


        let currentTime = currentDate.getTime();
      
        let difference = endDate.getTime()-currentDate.getTime() ;
        let days = difference / (1000 * 60 * 60 * 24);
        this.days = Math.floor(days);

         this.hours = Math.floor(
           (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
         );
         this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
         this.seconds = Math.floor((difference % (1000 * 60)) / 1000);

      },1000)

  }
 ngAfterContentChecked()
  {



      if(this.offerTag!=undefined)
      {

       if(this.seconds==0 && this.minutes==0 && this.hours==0 && this.days==0 || this.days<0)
       {
            clearInterval(this.timeInterval);
            this.offerTag.nativeElement.hidden=true;
            this.carService.offer=0
       }
      }
  }
  @ViewChild('offer') offerTag:ElementRef

  ngDoCheck() {


    if (this.router.url.includes('booking')) {
      this.carService.rentComponent = false;
    } else {
      this.carService.rentComponent = true;
    }
  }
  navigate()
  {
     if(!this.user.getUserLogged())
     {
        alert("please login and continue")
     }

  }



}
