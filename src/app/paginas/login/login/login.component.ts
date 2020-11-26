import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public slideOptions: any;

  constructor(private router: Router) {
    this.slideOptions = {
      initialSlide: 0,
      speed: 400
    };
   }

  ngOnInit() {}

  public navegar(url: string): void{
    this.router.navigate([url]);
  }

}
