import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUser } from 'src/app/util/user-util';
import { Exercise } from '../../../model/exercise.model';
import { User } from '../../../model/user.model';
import { ExerciseService } from '../../../service/exercise.service';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-exercise-selection',
  templateUrl: './exercise-selection.component.html',
  styleUrls: ['./exercise-selection.component.scss'],
})
export class ExerciseSelectionComponent implements OnInit {

  public user: User;
  public exercises: Exercise[] = [];
  public selectedExercise: Exercise;
  public loading: boolean;

  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private exerciseService: ExerciseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = getUser();
    this.findAllExercises();
  }

  public findAllExercises(): void {
    this.loading = true;
    this.exercises = [];
    this.exerciseService.findAllByCreator(this.user.id).subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      }, (error) => {
        this.toastService.error('Error while retrieving items!');
        console.error(error);
      }, () => {
        this.loading = false;
      }
    );
  }

  public dismiss() {
    this.modalController.dismiss(this.selectedExercise);
  }

  public goTo(url, param?): void {
    param ? this.router.navigate([url, param]) : this.router.navigate([url]);
  }

}