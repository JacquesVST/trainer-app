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
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.user = UserUtil.getUser();
        this.findAllTrainings();
    }

    public findAllTrainings(): void {
        this.loadingService.show();
        this.trainingService.findAllByCreator(this.user.id).subscribe(
            (trainings: Training[]) => {
                this.trainings = trainings;
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
        this.navService.goTo(url, param);
    }

    public goBack() {
        this.navService.goBack();
    }
}
