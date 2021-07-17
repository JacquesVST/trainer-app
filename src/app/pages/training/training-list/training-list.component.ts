import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public loading: boolean;

    constructor(private toastService: ToastService, private trainingService: TrainingService, private router: Router) {}

    ngOnInit() {
        this.user = UserUtil.getUser();
        this.findAllTrainings();
    }

    public findAllTrainings(): void {
        this.loading = true;
        this.trainings = [];
        this.trainingService.findAllByCreator(this.user.id).subscribe(
            (trainings: Training[]) => {
                this.trainings = trainings;
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

    public goTo(url, param?): void {
        param ? this.router.navigate([url, param]) : this.router.navigate([url]);
    }
}
