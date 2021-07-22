import { Component } from '@angular/core';
import { NavService } from 'src/app/service/nav.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';
import { Literals } from 'src/app/util/literal-util';
import { UserRequestDTO } from '../../../model/user/user-request-dto.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    public user: UserRequestDTO = new UserRequestDTO();
    public confirmPassword: string;
    public literals: any = Literals.getLiterals();

    constructor(private navService: NavService, private userService: UserService, private toastService: ToastService) {
        this.user.type = 'GYM_STUDENT';
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }

    public registerUser(): void {
        this.userService.registerUser(this.user).subscribe(
            (response) => {
                this.toastService.success('register');
                this.goTo('/login');
            },
            (error) => {
                console.error(error);
                this.toastService.error('processing_request');
            },
            () => {}
        );
    }
}
