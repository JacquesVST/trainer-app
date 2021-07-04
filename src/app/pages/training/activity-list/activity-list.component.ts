import { ToastService } from './../../../service/toast.service';
import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {

  @Input() public trainingId: number;
  public activities: Activity[] = [];
  public loading: boolean;

  constructor(
    private toastService: ToastService,
    private router: Router,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    if(this.trainingId){
      this.findAllByTraining();
    }
  }

  public findAllByTraining(): void {
    this.loading = true;
    this.activityService.findAllByTraining(this.trainingId).subscribe(
      (activities: Activity[]) => {
        this.activities = activities;
      }, (error) => {
        console.error(error);
        this.toastService.error('Error while retrieving activities!');
      }, () => {
        this.loading = false;
      });
  }

  public goTo(url, param?): void {
    param ? this.router.navigate([url, param]) : this.router.navigate([url]);
  }

}
