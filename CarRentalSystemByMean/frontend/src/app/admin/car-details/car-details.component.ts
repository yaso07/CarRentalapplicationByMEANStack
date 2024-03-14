import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  constructor(private car:CarService) { }

  carDetails:any
  ngOnInit() {
      this.car.getcardetails().subscribe((data)=>{
           this.carDetails=data
      })
  }

}
