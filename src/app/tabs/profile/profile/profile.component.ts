import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user/user.model';
import { ToastService } from 'src/app/shared/service/toast.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit{

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit() {

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

}
