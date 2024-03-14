import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css'],

})
export class BiddingComponent implements OnInit {
  constructor(private service: CarService, private userService: UserService) {}
  ngOnInit() {
    console.log(this.date);
    this.service.rentComponent = false;
    this.userService.getBiddingDetailsDesc().subscribe((data) => {
      this.biddingDetails = data;
      console.log(this.biddingDetails);
    });
  }

  biddingDetails: any;
  bidding: any;
  biddingid: any;
  value = {};
  container = false;
  style: any;
  date = '';
  selectedBidding(bidding) {
    this.container = true;
    this.bidding = bidding;
    this.biddingid = bidding._id;

    this.style = 'background-color';
  }
  accept(id: any) {
    this.value = { accepted: 'yes' };
    this.userService.updateBiddingDetails(id, this.value).subscribe();
  }
  reject(id: any) {
    this.value = { accepted: 'no' };
    this.userService.updateBiddingDetails(id, this.value).subscribe();
  }
}
