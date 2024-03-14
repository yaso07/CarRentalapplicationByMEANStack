import { Component ,Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {  adminEnvironment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    public form: FormBuilder,

    private user: UserService,

  ) {}
  currentpage = 'Login';

  content =
    'Sign in to your account and get the access to bookings and brouchers ';
  imgSrc = '/assets/images/securityimage3.jpg';

  ngOnInit() {}

  login = this.form.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  signup = false;
  userList: any;
  valid = true;
  button ='';

  navigate() {
    this.signup = true;
    this.currentpage = 'Signup';
    this.content = 'Create the account and start up the new Journey with us';
    this.imgSrc = '/assets/images/securityimage1.jpg';
  }
  getNavigate(value: any) {
    this.signup = value;
    this.currentpage ='Login';
    console.log("ssd")
    this.content =
      'Sign in to your account and get the access to bookings and brouchers ';
    this.imgSrc = '/assets/images/securityimage3.jpg';
  }
  name: any | null;

  userLogin(data: any) {

    this.name = this.login.controls['username'].value;
    this.user.getUser().subscribe((userList) => {
      this.userList = userList;
       console.log(this.userList)

      for (let user of this.userList) {
        if(this.login.controls['username'].value==adminEnvironment.username && this.login.controls['password'].value==adminEnvironment.password)
        {

                sessionStorage.setItem('admin', 'yaso');
                window.open('/admin');
                location.reload();
                break;
        }
        else if (
          user.username == this.login.controls['username'].value &&
          user.password == this.login.controls['password'].value
        ) {
          this.valid = true;

           console.log(user._id)

            sessionStorage.setItem('name', this.name);


           sessionStorage.setItem("id",user._id);
           location.reload()
            // if(this.router.url.includes(' ') || this.router.url.includes('home'))
            // {
            //     this.router.navigateByUrl(' ');
            // }


          break;
        } else {
          this.valid = false;
        }
      }
    });
  }

}
