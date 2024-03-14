import { Routes, RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { AdminAuthorizationGuard } from './guards/admin-authorization.guard';

const routes: Routes = [
  {
    path: 'admin',

    loadChildren: () => import('./admin/admin.module').then(() => AdminModule),


  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(() => UserModule),
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path:"**",
    redirectTo:'user',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
