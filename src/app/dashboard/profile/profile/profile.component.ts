import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUser, unsetUser } from 'src/app/util/user-util';
import { User } from '../../../model/user.model';
import { ToastService } from '../../../service/toast.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public user: User;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = getUser();
  }

  public spinnerRequest: boolean;
  public users: User[] = [];
  public selectedUser: User;

  public getAllUsers() {
    this.spinnerRequest = true;
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error(error);
        this.toastService.error('Failed to fetch users!')
      },
      () => {
        this.spinnerRequest = false;
      }
    );
  }

  public redirect(url: string): void {
    this.router.navigate([url]);
  }

  public logout(): void {
    this.router.navigateByUrl('/login');
    unsetUser();
  }

}
