import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModuleComponent } from './user-module.component';
import { HomeComponent } from './home/home.component';
import { BingMap, MapsModule } from '@syncfusion/ej2-angular-maps';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DbService } from '../services/db.service';

@NgModule({
  imports: [
    CommonModule,
    MapsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [UserModuleComponent, HomeComponent],
  providers:[DbService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModuleModule {}
