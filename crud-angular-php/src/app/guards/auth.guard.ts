import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { LoginService } from '../login/login.service';
import { AlertService } from '../shared/services/alert.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private alertService: AlertService,
        private loginService: LoginService,
        private router: Router,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {

        if (this.loginService.logged) {
            if (state.url.includes('login')) {
                this.router.navigate(['/']);
                this.alertService.showAlertDefault('User already logged in.', 2);
                return false;
            } else {
                return true;
            }
        } else {
            if (state.url.includes('person')) {
                this.router.navigate(['/login']);
                this.alertService.showAlertDefault('User is offline.', 2);
                return false;
            } else {
                return true;
            }
        }
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.loginService.logged;
    }
}
