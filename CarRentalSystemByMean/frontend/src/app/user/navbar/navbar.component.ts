import { Component } from '@angular/core';
import { EventEmitter,Output } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  blur:boolean=false;
  page:boolean=false;
  username:any;
  constructor(private user:UserService,private router:Router,private activatedRoute:ActivatedRoute)
  {}
  ngDoCheck()
  {
    this.username=sessionStorage.getItem('name')
  }
  getUser()
  {
    return this.user.getUserLogged()
  }
  removeUser()
  {
     sessionStorage.removeItem('name')
     this.router.navigate(['/user/home'])
  }



}
