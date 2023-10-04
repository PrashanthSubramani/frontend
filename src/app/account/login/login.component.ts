import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//Translate Start
import { TranslationService } from 'src/app/i18n/translation.service';
import { locale as english } from 'src/app/navigation/i18n/auth/login/en';
import { locale as spanish } from 'src/app/navigation/i18n/auth/login/es';

import { locale as common_english } from 'src/app/navigation/i18n/en';
import { locale as common_spanish } from 'src/app/navigation/i18n/es';
//Translate End

// Login Auth
import { environment } from '../../../environments/environment';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../auth/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/pages/auth/login.service';
import { AppCommonService } from 'src/app/shared/app-common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  show_app_key = this._appCommonService.doGetShowEntity();

  defaultAuth: any = {
    app_key: null,
    email: '',//'admin',
    password: '',//'a',
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
    private router: Router,
    private route: ActivatedRoute,

    private authService: AuthenticationService,
    public _spinner: NgxSpinnerService,


    private _loginService: LoginService,
    private _appCommonService: AppCommonService,

    private translationService: TranslateService,
    private _translationService: TranslationService,
    ) {
      this.translationService.use('es');
      this._translationService.loadTranslations(english, spanish, common_english, common_spanish);
      this.authService.doUnsetUserData();
    }

  ngOnInit(): void {
    if (environment.production === false) {
      this.defaultAuth = {
        app_key: 'GXK1SZNM', //AQDOXL5O //GXK1SZNM
        email: 'admin',
        password: 'a',
      };
    }

    /**
     * Form Validatyion
     */
     this.loginForm = this.formBuilder.group({
       app_key: [
         this.defaultAuth.app_key,
           Validators.compose([
           Validators.required,
           Validators.maxLength(8)])
       ],
       entity_id: [
         '0',
       ],
      email: [this.defaultAuth.email, [Validators.required]],
       password: [this.defaultAuth.password, [Validators.required]],
      // email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      // password: ['123456', [Validators.required]],
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

     if (environment.production) {
       if (!this._appCommonService.doGetShowEntity()) {
          const app_key = this._appCommonService.doGetHostEntity();
          const entity_id = 0;
          this.loginForm.patchValue({ app_key: app_key, entity_id: entity_id });
       }
     }
     
     if (this.loginForm.invalid) {
       return;
     }

     this._spinner.show();
     this.authService
       .login(this.f['email'].value, this.f['password'].value, this.f['app_key'].value, this.f['entity_id'].value)
       .pipe(first())
       .subscribe(
         data => {
           this._spinner.hide();
          if (data['error'] === 1) {
            // this._toastr.errorMessage(`LOGIN.${data['message']}`);
          } else {
            this.doLoginProcess(data);
          }
         },
         e => {
           this._spinner.hide();
          //  this._toastr.errorMessage('COMMON.SERVER_ERROR');
         });
  }

  doLoginProcess(data:any) {
    localStorage.setItem("version", data['app_version']);
    const cur_lang = data['rs']['language_code'];
    switch (cur_lang) {
      case 'US':
        this.translationService.use('en');
        this.translationService.setDefaultLang('en');
        break;
      case 'ES':
        this.translationService.use('es');
        this.translationService.setDefaultLang('es');
        break;
      default:
        break;
    }

    //Side bar menu generation part...
    this._loginService.menu_generate_data = data;
    this._loginService.doUpdateSideBarMenu();

    // //Default page after sign in...
    localStorage.setItem('prefix', '');


    const load_default_page = data['load_default_page']

    //For getting help based content from org id.
    localStorage.setItem('load_default_page', data['load_default_page']);
    localStorage.setItem('org_id', data['entities']['ENTITY_ID']);
    localStorage.setItem('signed_entity_id', data['entities']['ENTITY_ID']);
    //*********

    if (load_default_page === 'null' || load_default_page === null || load_default_page === '') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  
        this.router.navigate(['/auth/attendance-login']);
      });
    } else {
      this.router.navigate([load_default_page]);
    }
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
}
