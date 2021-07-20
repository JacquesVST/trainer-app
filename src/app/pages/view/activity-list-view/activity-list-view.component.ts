import { ActivityUtil } from './../../../util/activity-util';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/model/activity/activity.model';
import { ActivityService } from 'src/app/service/activity.service';
import { ToastService } from 'src/app/service/toast.service';
import { Literals } from 'src/app/util/literal-util';

@Component({
    selector: 'app-activity-list-view',
    templateUrl: './activity-list-view.component.html',
    styleUrls: ['./activity-list-view.component.scss']
})
export class ActivityListViewComponent implements OnInit {
    @Input() public trainingId: number;

    public activities: Activity[] = [];
    public loading: boolean;
    public literals: any = Literals.getLiterals();

    constructor(private toastService: ToastService, private router: Router, private activityService: ActivityService) {}

    ngOnInit() {
        if (this.trainingId) {
            this.findAllByTraining();
        }
    }

    public findAllByTraining(): void {
        this.loading = true;
        this.activityService.findAllByTraining(this.trainingId).subscribe(
            (activities: Activity[]) => {
                this.activities = activities;
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items');
            },
            () => {
                this.loading = false;
            }
        );
    }

    public getTotal(activity: Activity) {
        return ActivityUtil.checkTotal(activity.duration, activity.repeats, activity.sets, activity?.exercise?.title);
    }

    public goTo(url, param?): void {
        param ? this.router.navigate([url, param]) : this.router.navigate([url]);
    }
}
