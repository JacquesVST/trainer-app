import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/model/activity/activity.model';
import { ActivityService } from 'src/app/service/activity.service';
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
    public activities: Activity[] = [];
    public reorder: boolean = false;
    public reorderButton: string;
    public dividerTitle: string;
    public loading: boolean;
    public literals: any = Literals.getLiterals();

    constructor(private toastService: ToastService, private router: Router, private activityService: ActivityService) {}

    ngOnInit() {
        this.reorderButton = this.literals.form.reorder;
        this.dividerTitle = this.readMode ? this.literals.common.exercises : this.literals.common.activities;
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
                this.dividerTitle += ` (${this.activities?.length | 0})`;
                this.loading = false;
            }
        );
    }

    public saveActivitiesList(activities: ActivityRequestDTO[]): void {
        this.loading = true;
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
                this.loading = false;
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
            this.toastService.custom(this.literals.messages.save_reorder, 5000, 'warning');
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
        param ? this.router.navigate([url, param]) : this.router.navigate([url]);
    }
}
