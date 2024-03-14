import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css'],

})
export class UpdateCarComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private form: FormBuilder,
    private carService: CarService
  ) {}
  carId: any;
  car: any;
  ngOnInit() {
    let carDetails: any;
    this.route.params.subscribe((data) => {
      this.carId = data['id'];
      console.log(this.carId);
      this.carService.getcardetails().subscribe((data) => {
        carDetails = data;
        carDetails.filter((x) => {
          if (x._id == this.carId) {
            this.car = x;
          }
        });
        console.log(this.car);

        this.setCarData();
      });
    });
  }

  updateCarForm = this.form.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    fuel: ['', Validators.required],
    transmission: ['', Validators.required],
    image: ['', Validators.required],
    carType: ['', Validators.required],
    carCount:['',Validators.required],
    rent: ['', Validators.required],
  });

  setCarData() {
    this.updateCarForm.patchValue({
      brand: this.car.brand,
      model: this.car.model,
      fuel: this.car.fuel,
      carType: this.car.carType,
      rent: this.car.rent,
      transmission: this.car.transmission,
      carCount:this.car.carCount,
      image: this.car.image,
    });
  }

  updateCar() {
    this.updateCarForm.value.image=this.image[1]
    this.carService.updateCar(this.updateCarForm.value,this.carId).subscribe((data) => {});
  }
   imageSrc(image:any)
   {
    let value=image.value.toString()
    this.image=value.split('C:\\fakepath\\');
   }
  image:any
}
