import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BiddingComponent } from '../admin/bidding/bidding.component';

import { AuthorizationGuard, paymentGuard } from '../guards/authorization.guard';
import { CarForMonthsComponent } from './CarForMonths/CarForMonths.component';
import { CheckoutdetailsComponent } from './booking/checkoutdetails/checkoutdetails.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { CarrentalComponent } from './carrental/carrental.component';
import { HomeComponent } from './home/home.component';
import { MembershipComponent } from './membership/membership.component';
import { SubscriptionComponent } from './membership/subscription/subscription.component';
import { BookingHistoryComponent } from './mybookings/booking-history/booking-history.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from '../app.component';
import { UserComponent } from './user.component';
import { SampleComponent } from './sample/sample.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'car-for-month',
        component: CarForMonthsComponent,
      },
      {
        path: 'car',
        component: CarrentalComponent,

      },
      {
        path: 'Booking/:car',
        component: CheckoutdetailsComponent,
        canActivate: [AuthorizationGuard,paymentGuard],

      },
      {
        path: 'payment/:id',
        component: PaymentComponent,
        canActivate: [AuthorizationGuard,paymentGuard],
        canDeactivate:[AuthorizationGuard]
      },
      {
        path: 'car-for-month/payment/:id',
        component: PaymentComponent,
        canActivate: [AuthorizationGuard,paymentGuard],
        canDeactivate: [AuthorizationGuard,],
      },
      {
        path: 'mybookings',
        component: MybookingsComponent,
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'mybookings/history',
        component: BookingHistoryComponent,
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthorizationGuard],
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
