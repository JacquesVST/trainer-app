import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/model/user/login.model';
import { ToastService } from 'src/app/shared/service/toast.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public login: Login = new Login();
  public slideOptions: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService) {
    this.slideOptions = {
      initialSlide: 0,
      speed: 400
    };
   }

  ngOnInit() {}

  public navigate(url: string): void{
    this.router.navigate([url]);
  }

  public submitLogin(): void {
    this.userService.login(this.login).subscribe(
      (response) => {
        console.log(response);
        this.toastService.success(`Welcome back ${response.firstName}!`)
        this.navigate('dashboard');
      },
      (error) => {
        console.error(error);
        this.toastService.error('Username or password are incorrect!');
      },
      () => {}
    )
  }

}
