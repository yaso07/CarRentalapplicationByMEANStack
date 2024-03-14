import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {

  userData: any;

  constructor(
    private carService: CarService,
    private user: UserService,
    private form: FormBuilder,
    private router:Router
  ) {
    this.carService.rentComponent = false;
  }

  ngOnInit() {
    this.user.getUserById().subscribe((data) => {
      this.userData = data;
      console.log(this.userData);
      this.updateUser.patchValue({
        firstname: this.userData.firstname,
        lastname: this.userData.lastname,
        mobile: this.userData.mobile,
        email: this.userData.email,
      });
    });
  }
  updateUser = this.form.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    mobile: ['', Validators.required],
    email: ['', Validators.required,],
  });

  save() {
    this.user
      .updateUserdetails(this.updateUser.value, sessionStorage.getItem('id'))
      .subscribe((data) => {});
  }
  removeUser() {
     sessionStorage.removeItem('name');
   this.router.navigate(['/home'])
     console.log("sdsfs")
  }
}
