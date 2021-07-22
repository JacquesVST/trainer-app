import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/model/user/login.model';
import { NavService } from 'src/app/service/nav.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public login: Login = new Login();
    public slideOptions: any;
    public literals: any = Literals.getLiterals();

    constructor(private navService: NavService, private userService: UserService, private toastService: ToastService) {
        this.slideOptions = {
            initialSlide: 0,
            speed: 400
        };
    }

    ngOnInit() {}

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }

    public submitLogin(): void {
        this.userService.login(this.login).subscribe(
            (response) => {
                UserUtil.setUser(response);
                this.toastService.success('welcome');
                this.goTo('/dashboard');
            },
            (error) => {
                console.error(error);
                this.toastService.error('incorrect_login');
            },
            () => {}
        );
    }
}
