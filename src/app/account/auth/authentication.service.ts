import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user';
import { Router } from '@angular/router';
import { AppCommonService } from 'src/app/shared/app-common.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    empty:any = null;
    undefined:any = undefined;
    apiUrl = this._appCommonService.doGetHostApiUrl();
    constructor(
        private _appCommonService: AppCommonService,
        private router: Router,
        private http: HttpClient) {
        //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUserSubject = new BehaviorSubject<User>(this.undefined);

        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    getUserByToken(): Observable<User | undefined> {
        const auth:any = null;
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



    logout() {
        return this.http.post(`${this.apiUrl}/api/sys_user_logout`, { 'session': localStorage.getItem('session') })
            .pipe(map(response => {
     
                localStorage.removeItem('currentUser');

                this.currentUserSubject.next(this.empty);

                this.router.navigate(['/auth/login'], {
                  queryParams: {},
                });

                return response;
            }));
    }


}