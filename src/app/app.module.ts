import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthenticationService } from './account/auth/authentication.service';
import { AuthGuard } from './core/guards/auth.guard';
import { AppCommonService } from './shared/app-common.service';
import { PagesModule } from './pages/pages.module';
import { LayoutsModule } from './layouts/layouts.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { CustomAdapter, CustomDateParserFormatter } from './_helpers/format-datepicker';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AppToastrService } from './shared/app-toastr.service';
import { ToastrModule } from 'ngx-toastr';
import { SimplebarAngularModule } from 'simplebar-angular';
import { BreadCrumbsService } from './shared/bread-crumbs-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { environment } from 'src/environments/environment';
import { MenuSettingsConfig } from './layouts/settings/menu-settings.config';
import { SettingsModule } from './layouts/settings/settings.module';
import { ThemeSettingsConfig } from './layouts/settings/theme-settings.config';
import { RouterModule } from '@angular/router';
import { NavbarService } from './_services/navbar.service';
import { AuthService } from './_services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
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
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    LayoutsModule,
    NgxSpinnerModule,
    TranslateModule.forRoot(),
    ToastrModule.forRoot(),
    NgSelectModule,
    NgbModule,
    SimplebarAngularModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    // Settings modules
    SettingsModule.forRoot(ThemeSettingsConfig, MenuSettingsConfig),
    AngularFireModule.initializeApp(environment.firebase),
    PerfectScrollbarModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,

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
    AppToastrService,
    BreadCrumbsService,
    AuthGuard,
    NavbarService,
    AuthService
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
