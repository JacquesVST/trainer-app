import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/model/activity.model';
import { ToastService } from 'src/app/service/toast.service';
import { ActivityService } from './../../../service/activity.service';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss'],
})
export class  ActivityEditComponent implements OnInit {

  public trainingId: number;
  public activities: Activity[] = [];
  public loading: boolean;

  constructor(
    private toastService: ToastService,
    private router: Router,
    private activityService: ActivityService
  ) { }

  ngOnInit() {

  }




}
