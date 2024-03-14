import { Component, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';
import { AvailableCarsService } from 'src/app/services/availableCars.service';
import { CarService } from 'src/app/services/car.service';
import { FilterService } from 'src/app/services/filter.service';
import { RentInputFormServiceService } from 'src/app/services/rentInputFormService.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-carrental',
  templateUrl: './carrental.component.html',
  styleUrls: ['./carrental.component.css'],
})
export class CarrentalComponent {
  cars: any;
  constructor(
    public availableCarService:AvailableCarsService,
    private user: UserService,
    public carService: CarService,
    public filter: FilterService,
    private router: Router,
    private rentservice: RentInputFormServiceService,

  ) {




  }

  brand = this.filter.brand;
  fuelType = this.filter.fuelType;
  transmission = this.filter.transmission;
  value = '';
  totalDays: any;
  rentData: any;
  availableCars=[]

  ngDoCheck() {
    if (this.rentservice.totalDays != undefined) {
      this.totalDays = this.rentservice.totalDays;
    }

  }
  book() {
    this.carService.rentComponent = false;
  }

  ngOnInit() {
    sessionStorage.removeItem('bidding');
    sessionStorage.removeItem('biddingId');



    if (this.router.url.includes('booking')) {
      this.carService.rentComponent = false;
    } else {
      this.carService.rentComponent = true;
    }

    this.carService.getcardetails().subscribe((data) => {
      this.cars = data;



        this.rentData = this.carService.getRentData()
        console.log(this.rentData);
        let value1: any = new Date(this.rentData.rentdate);
        let value2: any = new Date(this.rentData.returndate);
        let a = value2 - value1;

        this.totalDays = Math.ceil(a / (1000 * 60 * 60 * 24));
        this.availableCarService.getAvailableCars(
          this.rentData.rentdate,
          this.rentData.returndate,
          this.rentData.location
        );
        setTimeout(()=>{
             this.availableCars = this.availableCarService.availableCars;
           
        },8000)

    });
  }

  getSearchValue(value: string) {
    this.value = value.toLowerCase();
  }

  brandnames: any;
  fueltype: any;
  check() {
    let valid = true;
    this.brand.forEach((data) => {
      if (data.value == true) {
        valid = false;
      }
    });
    return valid;
  }
  checkBrands(brand: any) {
    for (let name of this.brand) {
      if (name.name == brand && name.value == true) {
        return true;
      }
    }

    return false;
  }

  checkFuel(fueltype: any) {
    for (let fuel of this.fuelType) {
      if (fuel.name == fueltype && fuel.value == true) {
        return true;
      }
    }
    return false;
  }
  fuel() {
    let valid = true;
    this.fuelType.forEach((data) => {
      if (data.value == true) {
        valid = false;
      }
    });

    return valid;
  }

  checkTansmission(data: any) {
    for (let transmission of this.transmission) {
      if (transmission.name == data && transmission.value == true) {
        return true;
      }
    }
    return false;
  }

  gettransmission() {
    let valid = true;
    this.transmission.forEach((data) => {
      if (data.value == true) {
        valid = false;
      }
    });

    return valid;
  }

  navigate() {
    if (!this.user.getUserLogged()) {
      alert('please login and continue ');
    }
  }
}
