import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Tag } from 'src/app/model/tag.model';
import { Training } from 'src/app/model/training.model';
import { User } from 'src/app/model/user.model';
import { ToastService } from 'src/app/service/toast.service';
import { TrainingService } from 'src/app/service/training.service';
import { getUser } from 'src/app/util/user-util';
import { TagSelectionComponent } from '../../exercise/tag-selection/tag-selection.component';
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

  public selectedTags: Tag[];
  public selectedPicture: File;
  public loading: boolean;

  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private trainingService: TrainingService,
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
      (response: Training) => {
        if (!this.trainingId) {
          this.trainingId = response?.id;
          this.training.id = this.trainingId;
        }
        this.toastService.success('Training successfully saved!');
      },
      (error) => {
        console.error(error)
        this.toastService.error('Error while processing your request!');
      },
      () => {
        this.loading = false;
      }
    );
  }

  public prepareModel(): void {
    this.training.creatorId = this.user?.id;
    this.training.tagIds = this.selectedTags.map(tag => tag.id);
    this.persistTraining();
  }

  public convertToEdit(training: Training): void {
    this.training.id = training.id;
    this.training.title = training.title;
    this.training.description = training.description;
  }

  public async openTagSelection() {
    const modal = await this.modalController.create({
      component: TagSelectionComponent,
      componentProps: {
        selectedTags: this.selectedTags
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.selectedTags = data.data;
        }
      });

    return await modal.present();
  }

}
