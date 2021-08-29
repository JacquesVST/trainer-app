import { ImageService } from 'src/app/service/image.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';
import { Exercise } from '../../../model/exercise/exercise.model';
import { User } from '../../../model/user/user.model';
import { ExerciseService } from '../../../service/exercise.service';
import { ToastService } from '../../../service/toast.service';

@Component({
    selector: 'app-exercise-selection',
    templateUrl: './exercise-selection.component.html',
    styleUrls: ['./exercise-selection.component.scss']
})
export class ExerciseSelectionComponent implements OnInit {
    @Input() public selectedExercise: Exercise;
    public literals: any = Literals.getLiterals();
    public user: User;
    public exercises: Exercise[] = [];
    public initialExercise: Exercise;

    constructor(
        private modalController: ModalController,
        private toastService: ToastService,
        private exerciseService: ExerciseService,
        private navService: NavService,
        private loadingService: LoadingService,
        private imageService: ImageService
    ) {}

    ngOnInit() {
        this.initialExercise = this.selectedExercise ? this.selectedExercise : null;
        this.user = UserUtil.getUser();
        this.findAllExercises();
    }

    public async findAllExercises() {
        await this.loadingService.show();
        this.exerciseService.findAllByCreator(this.user.id).subscribe(
            (exercises: Exercise[]) => {
                this.processImages(exercises);
            },
            (error) => {
                this.toastService.error('retrieving_items', error);
                console.error(error);
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public async processImages(exercises) {
        for (let item of exercises) {
            item.picture = await this.imageService.getSanitizedOrDefault(item?.files[0]);
        }
        this.exercises = exercises;
    }

    public dismiss(save: boolean) {
        this.modalController.dismiss(save ? this.selectedExercise : this.initialExercise);
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }
}
