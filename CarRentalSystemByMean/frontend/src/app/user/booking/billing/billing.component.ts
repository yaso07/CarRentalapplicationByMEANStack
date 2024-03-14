import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent {
  userList: any;
  userData: any;
  existing: any;

  constructor(
    private route: ActivatedRoute,
    public carService: CarService,
    public router: Router,
    private form: FormBuilder,
    private user: UserService
  ) {}

  // ngDoCheck() {
  //   if (this.router.url.includes('booking')) {
  //     this.carService.rentComponent = false;
  //   } else {
  //     this.carService.rentComponent = true;
  //   }

  // }

  container=true;
  ngOnInit() {
    this.user
      .getUserById()
      .subscribe((userList) => {
        this.userList = userList;
        console.log(this.userList)
    //    sessionStorage.setItem('id', this.userList[0].id);
        console.log('called');
        this.setUserData();

      });
      console.log(this.billing)
  }

  billing = this.form.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    address:this.form.group({
    address1: ['', Validators.required],
    state: ['', Validators.required],
    pincode: ['', Validators.required]
    }),
    idProofs:this.form.group({
    aadhar: ['', Validators.required],
    licence: ['', Validators.required],
    })

  });

  addUserDetails() {
    this.user
      .updateUserdetails(this.billing.value, sessionStorage.getItem('id'))
      .subscribe((data) => {
        console.log(data);
        this.billing.reset();
        this.setUserData();
        if (this.router.url.includes('car-for-month')) {
          this.router.navigate(
            ['/car-for-month/payment/' + this.carService.currentcarid],
            { relativeTo: this.route }
          );
        } else {
          console.log('yes');
          this.router.navigate(
            ['../../payment/' + this.carService.currentcarid],
            { relativeTo: this.route }
          );
        }
      });
  }

  setUserData() {
    this.user.getUserById().subscribe((data) => {
      console.log(data);
      this.userData = data;
      console.log(this.userData.firstname);
      setTimeout(() => {
        this.billing.patchValue({
          firstname: this.userData.firstname,
          lastname: this.userData.lastname,
          email: this.userData.email,
          address:{
          address1: this.userData.address.address1,
          state: this.userData.address.state,
          pincode: this.userData.address.pincode
          },
          idProofs:{
          aadhar:this.userData.idProofs.aadhar,
          licence:this.userData.idProofs.licence
          }
        });

        if (this.billing.valid) {
          this.container = true;
        } else {
          this.container = false;
        }
      }, 3000);

    });
  }
}
