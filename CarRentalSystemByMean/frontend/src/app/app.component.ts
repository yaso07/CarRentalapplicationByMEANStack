import { Component } from '@angular/core';
import { CarService } from './services/car.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title:string = 'CarRentalSystem';
  constructor(private router:Router) {

  }
admin:any
  ngDoCheck()
  {

      if(this.router.url.includes('admin'))
      {
         this.admin=true;
      }
      else
      {
          this.admin=false;
      }
  }
}
