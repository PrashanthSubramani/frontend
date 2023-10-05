import { Component, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendance-login',
  templateUrl: './attendance-login.component.html',
  styleUrls: []
})
export class AttendanceLoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isPageLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['john@pixinvent.com', Validators.required],
      password: ['password@123', Validators.required],
      rememberMe: false
    });
    // Remember Me

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  tryLogin() {

  }
  
addCheckbox(event) {

}
  setUserInStorage(res) {

  }
}
