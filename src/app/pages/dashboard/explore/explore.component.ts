import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { ToastService } from 'src/app/service/toast.service';
import { TrainingService } from 'src/app/service/training.service';
import { getLiterals } from 'src/app/util/literal-util';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {

  public literals: any = getLiterals();
  public trainings: Training[] = []
  public loading: boolean = false;

  constructor(
    private trainingService: TrainingService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTrainings();
  }

  public getTrainings(refresh?) {
    this.loading = true;
    this.trainingService.findAll().subscribe(
      (trainings: Training[]) => {
        this.trainings = trainings;
      }, (error) => {
        console.error(error);
        this.toastService.error('retrieving_items');
      }, () => {
        this.loading = false;
        if (refresh) {
          setTimeout(() => refresh.target.complete(), 0);
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
