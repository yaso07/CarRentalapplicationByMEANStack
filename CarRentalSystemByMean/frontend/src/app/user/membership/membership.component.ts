import { Component, OnInit, ViewChild } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { MembershipService } from 'src/app/services/membership.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css'],

})
export class MembershipComponent implements OnInit {

  constructor(private carService:CarService,private membership:MembershipService) {
     carService.rentComponent = false;
   }

  ngOnInit() {
  }

  selectedMemberShip(type:any)
  {
      this.membership.membershipType=type;


  }

}
