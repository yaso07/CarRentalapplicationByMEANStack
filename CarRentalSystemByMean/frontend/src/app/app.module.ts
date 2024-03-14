import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarService } from './services/car.service';
import { FilterService } from './services/filter.service';
import { RentInputFormServiceService } from './services/rentInputFormService.service';
import { UserService } from './services/user.service';
import { BiddingService } from './services/bidding.service';
import { MembershipService } from './services/membership.service';
import { RefundService } from './services/refund.service';
import { AppRoutingModule } from './app-route.routing';
import { AdminAuthorizationGuard } from './guards/admin-authorization.guard';
import { AdminService } from './services/admin.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [		AppComponent,


   ],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule],

  providers: [
    CarService,
    FilterService,
    UserService,
    RentInputFormServiceService,
    BiddingService,
    MembershipService,
    RefundService,
    AdminAuthorizationGuard,AdminService
  ],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
