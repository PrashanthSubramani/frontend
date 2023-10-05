import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
//Translate Start
import { TranslationService } from 'src/app/i18n/translation.service';
import { locale as english } from 'src/app/navigation/i18n/auth/attendance-login/en';
import { locale as spanish } from 'src/app/navigation/i18n/auth/attendance-login/es';

import { locale as common_english } from 'src/app/navigation/i18n/en';
import { locale as common_spanish } from 'src/app/navigation/i18n/es';
//Translate End

// Login Auth
import { environment } from '../../../environments/environment';
//import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppToastrService } from 'src/app/shared/app-toastr.service';
import { AuthenticationService } from '../auth/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/pages/auth/login.service';
import { AppCommonService } from 'src/app/shared/app-common.service';
// import { WorklogService } from 'src/app/pages/ac/worklogs/worklog.service';

@Component({
  selector: 'app-attendance-login',
  templateUrl: './attendance-login.component.html',
  styleUrls: ['./attendance-login.component.css']
})
export class AttendanceLoginComponent {
  show_app_key = this._appCommonService.doGetShowEntity();

  defaultAuth: any = {
    device_number: '', //AQDOXL5O //GXK1SZNM
    phone:'',
    pin: '',
    force:'',
    app_key:''
  };

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    //private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,

    private authService: AuthenticationService,
    public _spinner: NgxSpinnerService,
    public _toastr: AppToastrService,

    private _loginService: LoginService,
    private _appCommonService: AppCommonService,

    private translationService: TranslateService,
    private _translationService: TranslationService,
    ) {
      // // redirect to home if already logged in
      // if (this.authService.currentUserValue) {
      //   this.router.navigate(['/']);
      // }

      this.translationService.use('es');

      // register translations
      this._translationService.loadTranslations(english, spanish, common_english, common_spanish);

      // remove user from local storage to log user out
      // this.authService.doUnsetUserData();
    }

  ngOnInit(): void {
    if (environment.production === false) {
      this.defaultAuth = {
        device_number: '2832712334', //AQDOXL5O //GXK1SZNM
        phone:'9080749683',
        pin: '57642',
        force:'N',
        app_key:'GXK1SZNM'
      };
    }

    /**
     * Form Validatyion
     */
     this.loginForm = this.formBuilder.group({
       device_number: ['2832712334', [Validators.required]],
       phone: ['9080749683', [Validators.required]],
       pin: ['57642', [Validators.required]],
       force: ['N', [Validators.required]],
       app_key:['GXK1SZNM']
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
   onSubmit() {
    this.submitted = true;
    const formData = this.loginForm.getRawValue();

     this._spinner.show();
     this.authService
       .attendanceLogin(formData)
       .pipe(first())
       .subscribe(
         data => {
           this._spinner.hide();
           console.log(data);
          if (data['error'] === 1) {
            this._toastr.errorMessage(data['message']);
          } else {
            this.router.navigate(['ac/worklogs']);
          }
         },
         e => {
           this._spinner.hide();
           this._toastr.errorMessage(e);
         });

  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  doForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
