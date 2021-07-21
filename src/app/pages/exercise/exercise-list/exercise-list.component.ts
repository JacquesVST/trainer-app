import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/service/loading.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';
import { Exercise } from '../../../model/exercise/exercise.model';
import { User } from '../../../model/user/user.model';
import { ExerciseService } from '../../../service/exercise.service';
import { ToastService } from '../../../service/toast.service';

@Component({
    selector: 'app-exercise-list',
    templateUrl: './exercise-list.component.html',
    styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public user: User;
    public exercises: Exercise[] = [];

    constructor(
        private toastService: ToastService,
        private exerciseService: ExerciseService,
        private router: Router,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.user = UserUtil.getUser();
        this.findAllExercises();
    }

    public findAllExercises(): void {
        this.loadingService.show();
        this.exerciseService.findAllByCreator(this.user.id).subscribe(
            (exercises: Exercise[]) => {
                this.exercises = exercises;
            },
            (error) => {
                this.toastService.error('retrieving_items');
                console.error(error);
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public goTo(url, param?): void {
        param ? this.router.navigate([url, param]) : this.router.navigate([url]);
    }
}
