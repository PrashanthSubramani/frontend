import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user';
import { Router } from '@angular/router';
import { AppCommonService } from 'src/app/shared/app-common.service';
import { AcUser } from './acuser';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private currentAcUserSubject : BehaviorSubject<AcUser>
    public currentAcUser: Observable<AcUser>;

    apiUrl = this._appCommonService.doGetHostApiUrl();
    constructor(
        private _appCommonService: AppCommonService,
        private router: Router,
        private http: HttpClient) {
            // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUserSubject = new BehaviorSubject<User>(undefined);
        this.currentUser = this.currentUserSubject.asObservable();

       this.currentAcUserSubject = new BehaviorSubject<AcUser>(JSON.parse(localStorage.getItem('AcUser')!)); 
       this.currentAcUser = this.currentAcUserSubject.asObservable();

    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentAcUserValue(): AcUser {
        return this.currentAcUserSubject.value;
    }


    getUserByToken(): Observable<User> {
        const auth = null;//this.getAuthFromLocalStorage();
        if (!auth || !auth.accessToken) {
          return of(undefined);
        }
        return of(undefined);
    }

    login(username: string, password: string, app_key: string, entity_id: any) {
        return this.http.post<any>(`${this.apiUrl}/user_signin`, { user_name: username, password, app_key, entity_id})
            .pipe(map(user => {
                if (user['entities'])
                {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    localStorage.setItem('entities',user['entities']['ENTITY_NAME'])
                }
                return user;
            }));
    }

    attendanceLogin(postData: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.currentUserValue.token}`
          });
        
          // Make the HTTP request with headers
          return this.http.post<any>(`${this.apiUrl}/api/GatePass/ValidateUser`, postData, { headers })
            .pipe(map(user => {
              console.log(user);
              if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('AcUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
              }
              return user;
            }));
    }

    doUpdateLanguage(postData: any) {
        return this.http.post(`${this.apiUrl}/api/sys_user_update_language`, postData)
            .pipe(map((response: any) => response));
    }

    doUpdateTheme(postData: any) {
        return this.http.post(`${this.apiUrl}/api/sys_user_update_theme`, postData)
            .pipe(map((response: any) => response));
    }

    doChangePassword(postData: any) {
        return this.http.post(`${this.apiUrl}/api/sys_user_change_password`, postData)
            .pipe(map((response: any) => response));
    }

    doForgotPassword(postData: any) {
        return this.http.post(`${this.apiUrl}/user_password_reset_link`, postData)
            .pipe(map((response: any) => response));
    }

    doResetPassword(postData: any) {
        return this.http.post(`${this.apiUrl}/user_password_reset`, postData)
            .pipe(map((response: any) => response));
    }

    logout() {
        //return this.http.post(`${this.apiUrl}/api/sys_user_logout`, {'session': localStorage.getItem('session')} )
        return this.http.post(`${this.apiUrl}/api/sys_user_logout`, { 'session': localStorage.getItem('session') })
            .pipe(map(response => {
                // remove user from local storage to log user out
                localStorage.removeItem('currentUser');
                this.currentUserSubject.next(null);

//                localStorage.removeItem(this.authLocalStorageToken);
                this.router.navigate(['/auth/login'], {
                  queryParams: {},
                });

                return response;
            }));
    }

    doUnsetUserData()
    {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}