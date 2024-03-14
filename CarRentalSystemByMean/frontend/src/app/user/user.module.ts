import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { CarForMonthsComponent } from './CarForMonths/CarForMonths.component';
import { BillingComponent } from './booking/billing/billing.component';
import { BookingComponent } from './booking/booking.component';
import { CheckoutdetailsComponent } from './booking/checkoutdetails/checkoutdetails.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { CarrentalComponent } from './carrental/carrental.component';
import { FilterComponent } from './carrental/filter/filter.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SlideComponent } from './home/slide/slide.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { LoginComponent } from './login/login.component';
import { MembershipComponent } from './membership/membership.component';
import { SubscriptionComponent } from './membership/subscription/subscription.component';
import { BookingHistoryComponent } from './mybookings/booking-history/booking-history.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { BiddingService } from '../services/bidding.service';
import { CarService } from '../services/car.service';
import { FilterService } from '../services/filter.service';
import { MembershipService } from '../services/membership.service';
import { RefundService } from '../services/refund.service';
import { RentInputFormServiceService } from '../services/rentInputFormService.service';
import { UserService } from '../services/user.service';
import { SampleComponent } from './sample/sample.component';
import { AuthorizationGuard, paymentGuard } from '../guards/authorization.guard';
import { AvailableCarsService } from '../services/availableCars.service';
import { AppRoutingModule } from '../app-route.routing';

@NgModule({
  declarations: [

    UserComponent,
    NavbarComponent,
    SlideComponent,
    CarrentalComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    BookingComponent,
    BillingComponent,
    CheckoutdetailsComponent,
    PaymentComponent,
    FilterComponent,
    FooterComponent,
    InputContainerComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    MybookingsComponent,
    MembershipComponent,
    CarForMonthsComponent,
    SubscriptionComponent,
    BookingHistoryComponent,
    SampleComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    CarService,
    FilterService,
    UserService,
    RentInputFormServiceService,
    BiddingService,
    MembershipService,
    RefundService,
    AuthorizationGuard,
    paymentGuard,
    AvailableCarsService
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class UserModule {}
