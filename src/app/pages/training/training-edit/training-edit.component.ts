import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Training } from 'src/app/model/training.model';
import { User } from 'src/app/model/user.model';
import { TagService } from 'src/app/service/tag.service';
import { ToastService } from 'src/app/service/toast.service';
import { TrainingService } from 'src/app/service/training.service';
import { getUser } from 'src/app/util/user-util';
import { TrainingRequestDTO } from './../../../model/training/training-request-dto.model';


@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.scss'],
})
export class TrainingEditComponent implements OnInit {

  public pageTitle: string;

  public user: User;
  public trainingId: number;
  public training: TrainingRequestDTO = new TrainingRequestDTO();

  public picture: File;
  public pictureId: number;

  public loading: boolean;

  constructor(
    private toastService: ToastService,
    private trainingService: TrainingService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.trainingId = params['id']);
    this.pageTitle = this.trainingId ? 'Edit training' : 'New training';
    this.user = getUser();
    if (this.trainingId) {
      this.getTraining();
    }
  }

  public getTraining(): void {
    this.loading = true;
    this.trainingService.findByTrainingId(this.trainingId).subscribe(
      (response: Training) => {
        this.convertToEdit(response);
      }, (error) => {
        console.error(error);
        this.toastService.error('Erro while getting training data!');
      }, () => {
        this.loading = false;
      });
  }

  public persistTraining() {
    this.loading = true;
    this.trainingService.persistTraining(this.training).subscribe(
      (request) => {
        this.router.navigate(['dashboard/profile']);
        this.toastService.success('Training successfully saved!');
      },
      (error) => {
        console.error(error)
        this.toastService.error('Error while processing your request!');
      },
      () => {
        this.training = new TrainingRequestDTO();
        this.loading = false;
      }
    );
  }

  public prepareModel(): void {
    this.training.creatorId = this.user?.id;
    this.persistTraining();
  }

  public convertToEdit(training: Training): void {
    this.training.id = training.id;
    this.training.title = training.title;
    this.training.description = training.description;
  }

}
