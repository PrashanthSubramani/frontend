import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AttendanceLoginComponent } from './attendance-login/attendance-login.component';


@NgModule({
  declarations: [
    LoginComponent,
    AttendanceLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AccountRoutingModule,
    NgbModalModule,
    NgbTooltipModule,
    TranslateModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
