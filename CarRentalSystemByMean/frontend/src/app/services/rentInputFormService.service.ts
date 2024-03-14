import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentInputFormServiceService {

constructor() { }

totalDays:any
   setRentdata(inputData:any)
   {

       console.log(inputData)
        let value1: any = new Date(inputData.rentdate);
        let value2: any = new Date(inputData.returndate);
        let a = value2 - value1;
        this.totalDays = Math.ceil(a / (1000 * 60 * 60 * 24));
        console.log(this.totalDays)
   }

}
