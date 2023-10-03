import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../account/auth/authentication.service';
import { AppCommonService } from '../shared/app-common.service';
import { AppToastrService } from '../shared/app-toastr.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private _appCommon: AppCommonService,
      private _toastr: AppToastrService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticationService.logout()
                .subscribe(
                  res => {
                    this._toastr.errorMessage('COMMON.TOKEN_EXPIRED');
                  },
                  error => {
                    this._toastr.errorMessage('COMMON.TOKEN_EXPIRED');
                  });
                const error = err;
                return throwError(error);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}