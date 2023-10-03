import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// Auth Services
import { AuthenticationService } from 'src/app/account/auth/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService
    ) { }

    canActivate() {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.authService.logout()
            .subscribe(
                (res:any) => {
                    if (res['error'] === 1) {

                    } else {
    
                    }
                },
                error => {
   
                });
        return false;        

    }
}