import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MembershipComponent } from '../membership.component';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { MembershipService } from 'src/app/services/membership.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  cardNumber: string = '';

  constructor(
    private carService: CarService,
    private router: Router,
    private user: UserService,
    private form: FormBuilder,
    private membership: MembershipService
  ) {}
  ngDoCheck() {
    if (this.router.url.includes('payment')) {
      this.carService.rentComponent = false;
    } else {
      this.carService.rentComponent = true;
    }
  }

  ngOnInit() {}

  payment = this.form.group({
    holderName: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expireDate: ['', Validators.required],
    cvv: ['', Validators.required],
  });

  value = 4;
  currentLength = this.cardNumber.length;
  validateCard(value: HTMLInputElement) {
    var temp = this.currentLength;

    this.currentLength = this.cardNumber.replaceAll(' ', '').length;
    if (this.currentLength > temp) {
      this.value++;
    } else if (this.currentLength <= temp) {
      this.value--;
    }

    if (
      value.value.replaceAll(' ', '').length % 4 == 0 &&
      temp < this.currentLength
    ) {
      value.value = value.value.concat(' ').toString();
    }
  }

  booking: any;
  subscription = {
    subscription: this.membership.membershipType,
    subscriptionDate: '',
    subscriptionEndDate:'',
  };

 addSubscription() {


    console.log(this.subscription);
    console.log(sessionStorage.getItem('id'));
     if (this.membership.membershipType == 'standard') {
       let date = new Date();
       this.subscription.subscriptionDate = date.toString();
       date.setDate(date.getDay() + 365 / 2);

        this.subscription.subscriptionEndDate = date.toString();
        this.user
          .updateUserdetails(this.subscription, sessionStorage.getItem('id'))
          .subscribe((data) => {
            console.log(data);
          });
     } else {
       let date = new Date();
       this.subscription.subscriptionDate = date.toString();
       date.setDate(date.getDay() + 365);
       this.subscription.subscriptionEndDate = date.toString();
        this.user
          .updateUserdetails(this.subscription, sessionStorage.getItem('id'))
          .subscribe((data) => {
            console.log(data);
          });
     }
 setTimeout(() => {

    this.router.navigateByUrl('/profile');
 }, 5000);
  }


}
