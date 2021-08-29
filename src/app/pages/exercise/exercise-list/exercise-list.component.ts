import { ImageService } from 'src/app/service/image.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
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
export class ExerciseListComponent {
    public literals: any = Literals.getLiterals();
    public user: User;
    public exercises: Exercise[] = [];

    constructor(
        private toastService: ToastService,
        private exerciseService: ExerciseService,
        private loadingService: LoadingService,
        private navService: NavService,
        private imageService: ImageService
    ) {}

    ionViewDidEnter() {
        this.user = UserUtil.getUser();
        this.findAllExercises();
    }

    public async findAllExercises() {
        await this.loadingService.show();
        this.exerciseService.findAllByCreator(this.user.id).subscribe(
            (exercises: Exercise[]) => {
                exercises.sort((a, b) => {
                    return a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase());
                });
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

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }

    public goBack() {
        this.navService.goBack();
    }
}
