import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Car } from 'src/app/services/Car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],

})
export class AddCarComponent implements OnInit {

   car=new Car();
  constructor(private form: FormBuilder, private carService: CarService) {}

  addCarForm:any
  ngOnInit() {

 this.addCarForm = this.form.group({
   brand: ['', Validators.required],
   model: ['', Validators.required],
   fuel: ['', Validators.required],
   transmission: ['', Validators.required],
   image: ['', Validators.required],
   carType: ['', Validators.required],
   carCount: ['', Validators.required],
   rent: ['', Validators.required],
 });
  }



  addCar() {

       this.car=this.addCarForm.value;
       console.log(this.car.brand)
       this.addCarForm.value.image = this.image[1];
       this.carService.addCar(this.addCarForm.value).subscribe((data) => {

           setTimeout(()=>{
                this.addCarForm.reset();
           },3000)

    });
  }
  imageSrc(image: any) {
    let value = image.value.toString();
    this.image = value.split('C:\\fakepath\\');
  }
  image: any;
}
