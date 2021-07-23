import { ImageService } from 'src/app/service/image.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { Literals } from 'src/app/util/literal-util';
import { Training } from '../../../model/training/training.model';
import { User } from '../../../model/user/user.model';
import { ToastService } from '../../../service/toast.service';
import { TrainingService } from '../../../service/training.service';
import { UserUtil } from '../../../util/user-util';

@Component({
    selector: 'app-training-list',
    templateUrl: './training-list.component.html',
    styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public user: User;
    public trainings: Training[] = [];

    constructor(
        private toastService: ToastService,
        private trainingService: TrainingService,
        private navService: NavService,
        private loadingService: LoadingService,
        private imageService: ImageService
    ) {}

    ngOnInit() {
        this.user = UserUtil.getUser();
        this.findAllTrainings();
    }

    public async findAllTrainings() {
        await this.loadingService.show();
        this.trainingService.findAllByCreator(this.user.id).subscribe(
            (trainings: Training[]) => {
                this.processImages(trainings);
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

    public async processImages(trainings) {
        for (let item of trainings) {
            item.picture = await this.imageService.getSanitizedOrDefault(item?.picture);
        }
        this.trainings = trainings;
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }

    public goBack() {
        this.navService.goBack();
    }
}
