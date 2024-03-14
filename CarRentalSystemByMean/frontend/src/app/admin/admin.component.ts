import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private service: CarService,
    private userService:UserService) {}
  ngOnInit() {



    this.service.rentComponent = false;

  }



}
