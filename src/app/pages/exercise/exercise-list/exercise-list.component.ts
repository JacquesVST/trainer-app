import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from 'src/app/model/exercise/exercise.model';
import { User } from 'src/app/model/user/user.model';
import { ExerciseService } from 'src/app/service/exercise.service';
import { ToastService } from 'src/app/service/toast.service';
import { getUser } from 'src/app/util/user-util';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent implements OnInit {

  @Input() public exerciseId: number;

  public user: User;
  public exercises: Exercise[] = [];
  public spinnerRequest: boolean;

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
    this.spinnerRequest = true;
    this.exercises = [];
    this.exerciseService.findAllByCreator(this.user.id).subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      }, (err) => {
        this.toastService.error('Error while retrieving items!');
        console.log(err);
      }, () => {
        this.spinnerRequest = false;
      }
    );
  }

  public goTo(url, param?): void {
    param ? this.router.navigate([url, param]) : this.router.navigate([url]);
  }

}