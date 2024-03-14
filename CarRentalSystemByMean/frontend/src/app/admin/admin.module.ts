import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { CarService } from '../services/car.service';

import { UserService } from '../services/user.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BiddingComponent } from './bidding/bidding.component';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminRoutingModule } from './my-route.routing';
import { RentInputFormServiceService } from '../services/rentInputFormService.service';
import { BiddingService } from '../services/bidding.service';
import { FilterService } from '../services/filter.service';
import { MembershipService } from '../services/membership.service';
import { RefundService } from '../services/refund.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateCarComponent } from './update-car/update-car.component';
import { AddCarComponent } from './add-car/add-car.component';

import { AdminAuthorizationGuard } from '../guards/admin-authorization.guard';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { AdminService } from '../services/admin.service';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],

  declarations: [
    AdminComponent,
    BiddingComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    CarDetailsComponent,
    UserDetailsComponent,
    UpdateCarComponent,
    AddCarComponent,
    UserBookingsComponent,
  ],

  providers: [
    CarService,
    FilterService,
    UserService,
    RentInputFormServiceService,
    BiddingService,
    MembershipService,
    RefundService,
    AdminAuthorizationGuard,
    AdminService,
  ],
  bootstrap: [AdminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
