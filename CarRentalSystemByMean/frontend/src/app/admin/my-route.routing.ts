import { Routes, RouterModule } from '@angular/router';
 
import { AddCarComponent } from './add-car/add-car.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { BiddingComponent } from './bidding/bidding.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateCarComponent } from './update-car/update-car.component';

import { AdminAuthorizationGuard } from '../guards/admin-authorization.guard';

import { UserBookingsComponent } from './user-bookings/user-bookings.component';



const adminroutes: Routes = [
  {
    canActivateChild: [AdminAuthorizationGuard],
    path: '',
    component: AdminComponent,
    children: [
      {

        canActivateChild: [AdminAuthorizationGuard],
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          {
            path: 'addcar',
            component: AddCarComponent,
          },
          {
            path: 'bookings/:userId',
            component: UserBookingsComponent,
          },

          {
            path: 'car-details',
            component: CarDetailsComponent,
          },
          {

            path: 'user-details',
            component: UserDetailsComponent,
          },
          {
            path: 'update-car/:id',
            component: UpdateCarComponent,
          },
          {
            path: '',
            redirectTo: 'user-details',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'bidding',
        component: BiddingComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminroutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule{}
