import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {

  searchValue:any
  fuelType = [
    { name: 'Petrol', value: false },
    { name: 'Diesel', value: false },
  ];
  brand = [
    { name: 'Tata', value: false },
    { name: 'Hyundai', value: false },
    { name: 'Maruti Suzuki', value: false },
    { name: 'Kia', value: false },
  ];

  transmission = [
    { name: 'Automatic', value: false },
    { name: 'Manual', value: false },
  ];
  cartype = ['Sedan', 'Suv'];
  constructor(

  ) {}
}
