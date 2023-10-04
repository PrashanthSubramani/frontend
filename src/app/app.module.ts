import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthenticationService } from './account/auth/authentication.service';
import { AuthGuard } from './core/guards/auth.guard';
import { AppCommonService } from './shared/app-common.service';
import { PagesModule } from './pages/pages.module';
import { LayoutsModule } from './layouts/layouts.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { CustomAdapter, CustomDateParserFormatter } from './_helpers/format-datepicker';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AppToastrService } from './shared/app-toastr.service';
function appInitializer(authService: AuthenticationService) {
  return () => {
    return new Promise((resolve: any) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    LayoutsModule,
    NgxSpinnerModule,
    TranslateModule.forRoot(),
    NgSelectModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthenticationService],
    },
    AuthGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AppCommonService,
    AppToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
