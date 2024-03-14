import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  signOut()
  {
      sessionStorage.removeItem('admin')
      if(confirm('Are you sure to logout from admin portal'))
      {
          this.router.navigate(['/user'])
      }

  }

}
