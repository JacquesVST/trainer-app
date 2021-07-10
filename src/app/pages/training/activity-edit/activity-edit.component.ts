import { ActivityRequestDTO } from './../../../model/activity/activity-request-dto.mode';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Activity } from 'src/app/model/activity.model';
import { User } from 'src/app/model/user.model';
import { ToastService } from 'src/app/service/toast.service';
import { ActivityService } from './../../../service/activity.service';
import { Exercise } from 'src/app/model/exercise.model';
import { ModalController } from '@ionic/angular';
import { ExerciseSelectionComponent } from '../../exercise/exercise-selection/exercise-selection.component';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss'],
})
export class ActivityEditComponent implements OnInit {

  public pageTitle: string;

  public activityId: number;
  public activity: ActivityRequestDTO = new ActivityRequestDTO();

  public selectedExercise: Exercise;
  public selectedTrainingId: number;
  public loading: boolean;

  public durationRange: any;
  public repeatsRange: any;
  public setsRange: any;

  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.activityId = params['id'];
      this.selectedTrainingId = params['trainingId'];
    });
    this.pageTitle = this.activityId ? 'Edit activity' : 'New activity';
    if (this.activityId) {
      this.getActivity();
    }

    this.durationRange = {
      min: 0,
      max: 60,
      step: 5
    }

    this.repeatsRange = {
      min: 0,
      max: 100,
      step: 5
    }

    this.setsRange = {
      min: 0,
      max: 20,
      step: 1
    }
  }

  public getActivity(): void {
    this.loading = true;
    this.activityService.findById(this.activityId).subscribe(
      (response: Activity) => {
        this.convertToEdit(response);
      }, (error) => {
        console.error(error);
        this.toastService.error('Erro while getting activity data!');
      }, () => {
        this.loading = false;
      });
  }

  public persistActivity() {
    this.loading = true;
    this.activityService.persistActivity(this.activity).subscribe(
      (request) => {
        //this.router.navigate(['dashboard/profile']);
        this.toastService.success('Activity successfully saved!');
      },
      (error) => {
        console.error(error)
        this.toastService.error('Error while processing your request!');
      },
      () => {
        // this.activity = new ActivityRequestDTO();
        this.loading = false;
      }
    );
  }

  public prepareModel(): void {
    this.activity.exerciseId = this.selectedExercise.id;
    this.activity.exerciseId = 1;
    this.activity.trainingId = this.selectedTrainingId;
    this.persistActivity();
  }

  public convertToEdit(activity: Activity): void {
    this.activity.id = activity.id;
    this.activity.comments = activity.comments;
    this.activity.duration = activity.duration;
    this.activity.repeats = activity.repeats;
    this.activity.sets = activity.sets
    this.selectedExercise = activity.exercise;
    this.selectedTrainingId = activity.training.id;
  }

  public goTo(url, param?): void {
    param ? this.router.navigate([url, param]) : this.router.navigate([url]);
  }

  public async openExerciseSelection() {
    const modal = await this.modalController.create({
      component: ExerciseSelectionComponent
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.selectedExercise = data.data;
        }
      });

    return await modal.present();
  }


}
