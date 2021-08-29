import { ImageService } from 'src/app/service/image.service';
import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/model/activity/activity.model';
import { ActivityService } from 'src/app/service/activity.service';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { ToastService } from 'src/app/service/toast.service';
import { Literals } from 'src/app/util/literal-util';
import { ActivityUtil } from './../../../util/activity-util';

@Component({
    selector: 'app-activity-list-view',
    templateUrl: './activity-list-view.component.html',
    styleUrls: ['./activity-list-view.component.scss']
})
export class ActivityListViewComponent implements OnInit {
    @Input() public trainingId: number;

    public activities: Activity[] = [];
    public literals: any = Literals.getLiterals();

    constructor(
        private toastService: ToastService,
        private navService: NavService,
        private activityService: ActivityService,
        private loadingService: LoadingService,
        private imageService: ImageService
    ) {}

    ngOnInit() {
        if (this.trainingId) {
            this.findAllByTraining();
        }
    }

    public async findAllByTraining() {
        await this.loadingService.show();
        this.activityService.findAllByTraining(this.trainingId).subscribe(
            (activities: Activity[]) => {
                this.processImages(activities);
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items', error);
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public async processImages(activities) {
        for (let item of activities) {
            item.picture = await this.imageService.getSanitizedOrDefault(item?.exercise?.files[0]);
        }
        this.activities = activities;
    }

    public getTotal(activity: Activity) {
        return ActivityUtil.checkTotal(activity.duration, activity.repeats, activity.sets, activity?.exercise?.title);
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }
}
