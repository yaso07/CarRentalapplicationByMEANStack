import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'any',
})
export class CarService {
  constructor(private http: HttpClient) {}

  carUrl = 'http://localhost:3200/api/rental/car';

  rentComponent = true;
  rent: any;
  return: any;
  location = '';
  currentcarid: any;
  currentPathForBooking: string;
  offerEndsDate = new Date(environment.offerEndsDate);

  offer = environment.offer;

  // addCar(car: any) {
  //   return this.http.post(this.carUrl, car);
  // }

  addCar(car: any) {
    return this.http.post(this.carUrl, car);
  }

  updateCar(car: any, carId: number) {
    return this.http.patch(this.carUrl + '/' + carId, car);
  }

  // getcardetails() {
  //   return this.http.get('http://localhost:3000/car');
  // }
  getcardetails() {
    this.http.get(this.carUrl).subscribe((data) => {

    });
    return this.http.get(this.carUrl);
  }
  getCarDetailsByModel(model: string) {
    return this.http.get(this.carUrl + '/?model=' + model);
  }

  setRentInput(rentdata: any) {
    sessionStorage.setItem('rentDate', rentdata.rentdate);
    sessionStorage.setItem('returnDate', rentdata.returndate);
    sessionStorage.setItem('location', rentdata.location);
  }

  getRentData() {
    let object = {
      rentdate: sessionStorage.getItem('rentDate'),
      returndate: sessionStorage.getItem('returnDate'),
      location: sessionStorage.getItem('location'),
    };
    return object;
  }
}
