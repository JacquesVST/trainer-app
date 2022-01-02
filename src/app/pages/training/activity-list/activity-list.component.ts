import { ImageService } from 'src/app/service/image.service';
import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/model/activity/activity.model';
import { ActivityService } from 'src/app/service/activity.service';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { Literals } from 'src/app/util/literal-util';
import { ActivityRequestDTO } from './../../../model/activity/activity-request-dto.mode';
import { ToastService } from './../../../service/toast.service';
import { MediaFile } from 'src/app/model/media-file/media-file.model';

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
        private loadingService: LoadingService,
        private imageService: ImageService
    ) {}

    ngOnInit() {
        this.reorderButton = this.literals.form.reorder;
        this.dividerTitle = this.getDividerTitle();
        if (this.trainingId) {
            this.findAllByTraining();
        }
    }

    public async findAllByTraining() {
        await this.loadingService.show();
        this.activityService.findAllByTraining(this.trainingId).subscribe(
            (activities: Activity[]) => {
                this.dividerTitle = `${this.getDividerTitle()} (${activities?.length})`;
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

    public async saveActivitiesList(activities: ActivityRequestDTO[]) {
        await this.loadingService.show();
        this.activityService.persistActivities(activities).subscribe(
            (activities: Activity[]) => {
                this.processImages(activities);
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items', error);
            },
            () => {
                this.reorder = false;
                this.loadingService.hide();
            }
        );
    }

    public async processImages(activities) {
        for (let item of activities) {
            let file = item.exercise.files.find(f => f.type !== 'mp4');
            if (!file){
                file = new MediaFile();
            }
            item.picture = await this.imageService.getSanitizedOrDefault(file);
        }
        this.activities = activities;
    }

    public prepareModels(newTrainingId?: number): void {
        const result: ActivityRequestDTO[] = [];
        for (let index: number = 0; index < this.activities.length; index++) {
            const activity = this.activities[index];
            result.push({
                id: newTrainingId ? undefined : activity.id,
                duration: activity.duration,
                repeats: activity.repeats,
                sets: activity.sets,
                comments: activity.comments,
                exerciseId: activity.exercise.id,
                trainingId: newTrainingId ? newTrainingId : activity.training.id,
                sequentialOrder: index
            });
        }
        this.saveActivitiesList(result);
    }

    public getDividerTitle(){
        return this.readMode ? this.literals.common.exercises : this.literals.common.activities;
    }

    public toggleReorder() {
        if (this.reorder) {
            this.prepareModels();
        } else {
            this.toastService.custom({
                message: this.literals.messages.save_reorder,
                duration: 5000,
                color: 'warning',
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
