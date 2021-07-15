import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getLiterals } from 'src/app/util/literal-util';
import { getUser } from 'src/app/util/user-util';
import { Exercise } from '../../../model/exercise/exercise.model';
import { User } from '../../../model/user/user.model';
import { ExerciseService } from '../../../service/exercise.service';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent implements OnInit {

  public literals: any = getLiterals();
  public user: User;
  public exercises: Exercise[] = [];
  public loading: boolean;

  constructor(
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
        this.toastService.error('retrieving_items');
        console.error(error);
      }, () => {
        this.loading = false;
      }
    );
  }

  public goTo(url, param?): void {
    param ? this.router.navigate([url, param]) : this.router.navigate([url]);
  }

}