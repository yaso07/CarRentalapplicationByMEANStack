import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

import { FormBuilder, FormControl, Validators ,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AvailableCarsService } from 'src/app/services/availableCars.service';
import { CarService } from 'src/app/services/car.service';
import { RentInputFormServiceService } from 'src/app/services/rentInputFormService.service';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css'],

})
export class InputContainerComponent {
  constructor(

    public fb: FormBuilder,
    public carService: CarService,
    private rentservice:RentInputFormServiceService,
    private checkAvailability:AvailableCarsService,
    private router:Router

  ) {


  }

  rentDateStart=""
  returnDateStart=""
  ngOnInit()
  {

      let currentDate = new Date();
      console.log(currentDate);
      this.rentDateStart =
        currentDate.getFullYear() +
        '-' +
        (currentDate.getMonth() <= 8
          ? '0' + (currentDate.getDate() >=30?(currentDate.getMonth() + 2):currentDate.getMonth()+1)
          :(currentDate.getDate()>=30?currentDate.getMonth()==11?'01': currentDate.getMonth() + 2:currentDate.getMonth()+1))+
        '-' +
        (currentDate.getDate() <= 8
          ? '0' + (currentDate.getDate() + 1)
          : (currentDate.getDate() == 30 && currentDate.getMonth() % 2 != 0
              ? '01'
              : currentDate.getDate() == 31) && currentDate.getMonth() % 2 == 0
          ? '01'
          : currentDate.getDate() + 1) +
        ' ' +
        (currentDate.getHours() < 10
          ? '0' + currentDate.getHours()
          : currentDate.getHours()) +
        ':' +
        (currentDate.getMinutes() < 10
          ? '0' + currentDate.getMinutes()
          : currentDate.getMinutes());

           setTimeout(()=>{

              if(this.router.url.includes('car') || this.router.url.includes('Booking'))
              {

                  let rentData:any =   this.carService.getRentData();
                  console.log(rentData.location);
                  this.inputform.reset();
                  this.inputform.patchValue({
                        location:rentData.location,
                        rentdate:rentData.rentdate,
                        returndate:rentData.returndate

                  });


              }

           },2000)

  }




  location: any;

  inputform = this.fb.group({
    location: ['', Validators.required],
    rentdate: ['', Validators.required],
    returndate: ['', Validators.required],
  });



  onsubmit(data: any) {


            this.checkAvailability.getAvailableCars(
              this.inputform.controls['rentdate'].value,
              this.inputform.controls['returndate'].value,
              this.inputform.controls['location'].value,
            );



               this.carService.setRentInput(this.inputform.value)

                 console.log(data);
                 this.rentservice.setRentdata(this.inputform.value);

         }





  setMinDate(date:any)
  {

      this.inputform.controls['returndate'].reset();
      let rentDate=new Date(date.value)
      this.returnDateStart =
        rentDate.getFullYear() +
        '-' +
        (rentDate.getMonth() <=8
          ? '0' + (rentDate.getMonth() + 1)
          : rentDate.getMonth()+1) +
        '-' +
        (rentDate.getDate() <=8
          ? '0' + (rentDate.getDate()+1)
          : (rentDate.getDate())+1) +
        ' ' +
        (rentDate.getHours() < 10
          ? '0' + rentDate.getHours()
          : rentDate.getHours()) +
        ':' +
        (rentDate.getMinutes() < 10
          ? '0' + rentDate.getMinutes()
          : rentDate.getMinutes());
  }




}
