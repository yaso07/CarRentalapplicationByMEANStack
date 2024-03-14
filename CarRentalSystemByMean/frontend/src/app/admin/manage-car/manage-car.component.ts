import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.css'],

})
export class ManageCarComponent implements OnInit {

  constructor(private car:CarService) { }
  carDetails:any
  ngOnInit() {

         this.car.getcardetails().subscribe((data)=>{
               this.carDetails=data
         })
  }


}
