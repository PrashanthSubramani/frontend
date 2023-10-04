import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Auth Services
import { AuthenticationService } from 'src/app/account/auth/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService,
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
            data => {
              console.log('Logout successful', data);
            },
            error => {
              console.log('Logout error', error);
            }
          );
        return false;        

    }
}