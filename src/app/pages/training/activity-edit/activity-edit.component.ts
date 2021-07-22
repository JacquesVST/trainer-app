import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Activity } from 'src/app/model/activity/activity.model';
import { Exercise } from 'src/app/model/exercise/exercise.model';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { ToastService } from 'src/app/service/toast.service';
import { Literals } from 'src/app/util/literal-util';
import { ExerciseSelectionComponent } from '../../exercise/exercise-selection/exercise-selection.component';
import { ActivityCount } from './../../../model/activity/activity-count.model';
import { ActivityRequestDTO } from './../../../model/activity/activity-request-dto.mode';
import { ActivityService } from './../../../service/activity.service';
import { ActivityUtil } from './../../../util/activity-util';

@Component({
    selector: 'app-activity-edit',
    templateUrl: './activity-edit.component.html',
    styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public pageTitle: string;

    public activityId: number;
    public activity: ActivityRequestDTO = new ActivityRequestDTO();
    public total: string = '...';

    public selectedExercise: Exercise;
    public selectedTrainingId: number;

    public durationInput: ActivityCount;
    public repeatsInput: ActivityCount;
    public setsInput: ActivityCount;

    constructor(
        private modalController: ModalController,
        private toastService: ToastService,
        private activityService: ActivityService,
        private navService: NavService,
        private route: ActivatedRoute,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.activityId = params['id'];
            this.selectedTrainingId = params['training'];
        });
        this.pageTitle = this.literals.pages[this.activityId ? 'edit_activity' : 'new_activity'];
        if (this.activityId) {
            this.getActivity();
        }

        this.durationInput = {
            active: true,
            min: 0,
            max: 60,
            step: 5,
            value: 0
        };

        this.repeatsInput = {
            active: true,
            min: 0,
            max: 100,
            step: 5,
            value: 0
        };

        this.setsInput = {
            active: true,
            min: 0,
            max: 20,
            step: 1,
            value: 0
        };
    }

    public getActivity(): void {
        this.loadingService.show();
        this.activityService.findById(this.activityId).subscribe(
            (response: Activity) => {
                this.convertToEdit(response);
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

    public persistActivity() {
        this.loadingService.show();
        this.activityService.persistActivity(this.activity).subscribe(
            (response: Activity) => {
                this.toastService.success('item_saved');
                if (!this.activityId) {
                    this.activityId = response.id;
                    this.activity.id = this.activityId;
                }
            },
            (error) => {
                console.error(error);
                this.toastService.error('processing_request');
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public prepareModel(): void {
        this.activity.duration = this.durationInput.value;
        this.activity.repeats = this.repeatsInput.value;
        this.activity.sets = this.setsInput.value;

        this.activity.exerciseId = this.selectedExercise.id;
        this.activity.trainingId = this.selectedTrainingId;
        this.persistActivity();
    }

    public convertToEdit(activity: Activity): void {
        this.activity.id = activity.id;
        this.activity.comments = activity.comments;
        this.activity.sequentialOrder = activity.sequentialOrder;

        this.durationInput.value = activity.duration;
        this.repeatsInput.value = activity.repeats;
        this.setsInput.value = activity.sets;

        this.selectedExercise = activity.exercise;
        this.selectedTrainingId = activity.training.id;
        this.showTotal();
    }

    public showTotal() {
        this.total = '...';
        this.total = ActivityUtil.checkTotal(
            this.durationInput.value,
            this.repeatsInput.value,
            this.setsInput.value,
            this.selectedExercise?.title
        );
    }

    public disableInput(event, input: ActivityCount) {
        if (event.detail.checked) {
            input.active = true;
        } else {
            input.active = false;
            input.value = 0;
        }
    }

    public async openExerciseSelection() {
        const modal = await this.modalController.create({
            component: ExerciseSelectionComponent
        });

        modal.onDidDismiss().then((data) => {
            if (data.data) {
                this.selectedExercise = data.data;
            }
        });

        return await modal.present();
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }

    public goBack() {
        this.navService.goBack();
    }
}
