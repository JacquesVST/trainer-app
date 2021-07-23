import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/model/activity/activity.model';
import { ActivityService } from 'src/app/service/activity.service';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { Literals } from 'src/app/util/literal-util';
import { ActivityRequestDTO } from './../../../model/activity/activity-request-dto.mode';
import { ToastService } from './../../../service/toast.service';

@Component({
    selector: 'app-activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
    @Input() public trainingId: number;
    @Input() public readMode: boolean;
    public literals: any = Literals.getLiterals();
    public activities: Activity[] = [];
    public reorder: boolean = false;
    public reorderButton: string;
    public dividerTitle: string;

    constructor(
        private toastService: ToastService,
        private navService: NavService,
        private activityService: ActivityService,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.reorderButton = this.literals.form.reorder;
        this.dividerTitle = this.readMode ? this.literals.common.exercises : this.literals.common.activities;
        if (this.trainingId) {
            this.findAllByTraining();
        }
    }

    public async findAllByTraining() {
        await this.loadingService.show();
        this.activityService.findAllByTraining(this.trainingId).subscribe(
            (activities: Activity[]) => {
                this.activities = activities;
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items');
            },
            () => {
                this.dividerTitle += ` (${this.activities?.length | 0})`;
                this.loadingService.hide();
            }
        );
    }

    public async saveActivitiesList(activities: ActivityRequestDTO[]) {
        await this.loadingService.show();
        this.activityService.persistActivities(activities).subscribe(
            (activities: Activity[]) => {
                this.activities = activities;
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items');
            },
            () => {
                this.reorder = false;
                this.loadingService.hide();
            }
        );
    }

    public prepareModels(): void {
        const result: ActivityRequestDTO[] = [];
        for (let index: number = 0; index < this.activities.length; index++) {
            const activity = this.activities[index];
            result.push({
                id: activity.id,
                duration: activity.duration,
                repeats: activity.repeats,
                sets: activity.sets,
                comments: activity.comments,
                exerciseId: activity.exercise.id,
                trainingId: activity.training.id,
                sequentialOrder: index
            });
        }
        this.saveActivitiesList(result);
    }

    public toggleReorder() {
        if (this.reorder) {
            this.prepareModels();
        } else {
            this.toastService.custom({
                message: this.literals.messages.save_reorder,
                duration: 5000,
                color: 'warn',
                position: 'top'
            });
        }
        this.reorderButton = this.reorder ? this.literals.form.reorder : this.literals.common.save;
        this.reorder = !this.reorder;
    }

    public doReorder(event) {
        const itemMove = this.activities.splice(event.detail.from, 1)[0];
        this.activities.splice(event.detail.to, 0, itemMove);
        event.detail.complete();
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }
}
