import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Training } from 'src/app/model/training/training.model';
import { User } from 'src/app/model/user/user.model';
import { ToastService } from 'src/app/service/toast.service';
import { TrainingService } from 'src/app/service/training.service';
import { getLiterals } from 'src/app/util/literal-util';
import { getUser } from 'src/app/util/user-util';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.scss'],
})
export class TrainingViewComponent implements OnInit {

  public literals: any = getLiterals();
  public pageTitle: string;

  public user: User;
  public trainingId: number;
  public training: Training = new Training();

  public loading: boolean;

  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private trainingService: TrainingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.trainingId = params['id']);
    this.user = getUser();
    if (this.trainingId) {
      this.getTraining();
    }
  }

  public getTraining(): void {
    this.loading = true;
    this.trainingService.findByTrainingId(this.trainingId).subscribe(
      (training: Training) => {
        this.training = training;
        this.pageTitle = training.title;
      }, (error) => {
        console.error(error);
        this.toastService.error('retrieving_itens');
      }, () => {
        this.loading = false;
      });
  }

  public async openTagSelection() {
    const modal = await this.modalController.create({
      component: null,
      componentProps: {
        selectedTags: null
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          console.log(data)
        }
      });

    return await modal.present();
  }


}
