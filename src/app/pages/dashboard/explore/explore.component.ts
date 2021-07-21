import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training/training.model';
import { LoadingService } from 'src/app/service/loading.service';
import { ToastService } from 'src/app/service/toast.service';
import { TrainingService } from 'src/app/service/training.service';
import { Literals } from 'src/app/util/literal-util';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public trainings: Training[] = [];

    constructor(
        private trainingService: TrainingService,
        private toastService: ToastService,
        private router: Router,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.loadingService.show();
        this.getTrainings();
    }

    public async getTrainings(refresh?) {
        this.trainingService.findAll().subscribe(
            (trainings: Training[]) => {
                this.trainings = trainings;
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items');
            },
            () => {
                if (refresh) {
                    setTimeout(() => refresh.target.complete(), 500);
                } else {
                    this.loadingService.hide();
                }
            }
        );
    }

    public doRefresh(event) {
        this.getTrainings(event);
    }

    public goTo(url, param?): void {
        param ? this.router.navigate([url, param]) : this.router.navigate([url]);
    }
}
