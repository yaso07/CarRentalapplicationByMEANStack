import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModuleModule } from './user-module/user-module.module';

const routes: Routes = [

   {
      path:'user',
      loadChildren:()=>import('./user-module/user-module.module').then(()=>UserModuleModule)
   },
   {
    path:"**",
    redirectTo:"user",
    pathMatch:'full'
   },
    {
    path:"",
    redirectTo:"user",
    pathMatch:'full'
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
