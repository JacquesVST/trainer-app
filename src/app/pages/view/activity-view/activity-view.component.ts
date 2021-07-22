import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Activity } from 'src/app/model/activity/activity.model';
import { ActivityService } from 'src/app/service/activity.service';
import { LoadingService } from 'src/app/service/loading.service';
import { ToastService } from 'src/app/service/toast.service';
import { ActivityUtil } from 'src/app/util/activity-util';
import { Literals } from 'src/app/util/literal-util';
import { NavService } from './../../../service/nav.service';

@Component({
    selector: 'app-activity-view',
    templateUrl: './activity-view.component.html',
    styleUrls: ['./activity-view.component.scss']
})
export class ActivityViewComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public activityId: number;
    public activity: Activity = new Activity();
    public total: string = '...';

    constructor(
        private activityService: ActivityService,
        private route: ActivatedRoute,
        private toastService: ToastService,
        private loadingService: LoadingService,
        private navService: NavService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.activityId = params['id'];
        });
        if (this.activityId) {
            this.getActivity();
        }
    }

    public getActivity(): void {
        this.loadingService.show();
        this.activityService.findById(this.activityId).subscribe(
            (activity: Activity) => {
                this.activity = activity;
                this.total = ActivityUtil.checkTotal(
                    activity.duration,
                    activity.repeats,
                    activity.sets,
                    activity?.exercise?.title
                );
                console.log(this.activity);
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items');
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public goBack() {
        this.navService.goBack();
    }
}
