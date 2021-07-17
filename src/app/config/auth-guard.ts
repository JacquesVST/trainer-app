import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserUtil } from '../util/user-util';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        if (UserUtil.getUser()) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
