import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';
import { getLiterals } from 'src/app/util/literal-util';
import { getUser, unsetUser } from 'src/app/util/user-util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public literals: any = getLiterals();
  public user: User;
  public loading: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.user = getUser();
  }

  public redirect(url: string): void {
    this.router.navigate([url]);
  }

  public logout(): void {
    this.router.navigateByUrl('/login');
    unsetUser();
  }

}
