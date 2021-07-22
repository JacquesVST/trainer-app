import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserUtil } from '../util/user-util';
import { NavService } from './../service/nav.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private navService: NavService) {}

    canActivate() {
        if (UserUtil.getUser()) {
            return true;
        } else {
            this.navService.exit();
            return false;
        }
    }
}
