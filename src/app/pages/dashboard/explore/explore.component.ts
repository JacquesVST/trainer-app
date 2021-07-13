import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { ToastService } from 'src/app/service/toast.service';
import { TrainingService } from 'src/app/service/training.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {

  public trainings: Training[] = []
  public loading: boolean = false;

  constructor(
    private trainingService: TrainingService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getTrainings();
  }

  public getTrainings() {
    this.loading = true;
    this.trainingService.findAll().subscribe(
      (trainings: Training[]) => {
        console.log(trainings)
        this.trainings = trainings;
      }, (error) => {
        console.error(error);
        this.toastService.error('Error while retrieving items!');
      }, () => {
        this.loading = false;
      }
    );
  }

}
