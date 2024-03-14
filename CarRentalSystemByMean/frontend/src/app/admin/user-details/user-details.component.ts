import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],

})
export class UserDetailsComponent implements OnInit {

  constructor(private user:UserService) { }

  userDetails:any
  ngOnInit() {
      this.user.getUser().subscribe((data)=>{
          this.userDetails=data

      })


  }

}
