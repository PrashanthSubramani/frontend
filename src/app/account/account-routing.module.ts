import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AttendanceLoginComponent } from './attendance-login/attendance-login.component';

const routes: Routes = [
  {
    path:'login',
    component : LoginComponent
  },
  {
    path:'attendance_login',
    component : AttendanceLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
