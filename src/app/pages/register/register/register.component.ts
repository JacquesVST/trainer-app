import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegisterDTO } from 'src/app/model/user/user-register-dto.model';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  @ViewChild('slides') private slides: ElementRef;
  public user: UserRegisterDTO = new UserRegisterDTO();
  public confirmPassword: string;
  public slideOptions: any

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService) {
    this.slideOptions = {
      initialSlide: 0,
      speed: 400
    };
    this.user.type = "GYM_STUDENT";
   }

  public navigate(url: string): void{
    this.router.navigate([url]);
  }

  public registerUser(): void {
    this.userService.registerUser(this.user).subscribe(
      (response) => {
        this.toastService.success('Successfully registered!');
        this.navigate('login')
      },
      (error) => {
        console.error(error)
        this.toastService.error('Something went wrong');
      },
      () => {},
    )
  }

  public next(slides: any){
    slides.slideNext();
  }

  public prev(slides: any){
    slides.slidePrev();
  }
}
