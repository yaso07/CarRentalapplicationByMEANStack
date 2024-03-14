import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlTree} from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "../services/admin.service";

@Injectable({
  providedIn:'root'
})

export class userResolveService implements Resolve<any>{


  constructor(private activateRoute:ActivatedRoute,private admin:AdminService){
      console.log('entered')
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

       return this.activateRoute.params.subscribe((data)=>{
           let userid=data['userId']
           console.log(userid)
          //  return this.admin.getUserById(data['userId']).subscribe((data)=>{
          //    return data;
          //  })
      })
  }
}


