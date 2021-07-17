import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserUtil } from 'src/app/util/user-util';
import { Exercise } from '../../../model/exercise/exercise.model';
import { User } from '../../../model/user/user.model';
import { ExerciseService } from '../../../service/exercise.service';
import { ToastService } from '../../../service/toast.service';
import { Literals } from 'src/app/util/literal-util';

@Component({
    selector: 'app-exercise-selection',
    templateUrl: './exercise-selection.component.html',
    styleUrls: ['./exercise-selection.component.scss']
})
export class ExerciseSelectionComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public user: User;
    public exercises: Exercise[] = [];
    public selectedExercise: Exercise;
    public loading: boolean;

    constructor(
        private modalController: ModalController,
        private toastService: ToastService,
        private exerciseService: ExerciseService,
        private router: Router
    ) {}

    ngOnInit() {
        this.user = UserUtil.getUser();
        this.findAllExercises();
    }

    public findAllExercises(): void {
        this.loading = true;
        this.exercises = [];
        this.exerciseService.findAllByCreator(this.user.id).subscribe(
            (exercises: Exercise[]) => {
                this.exercises = exercises;
            },
            (error) => {
                this.toastService.error('retrieving_items');
                console.error(error);
            },
            () => {
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
