
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/model/exercise.model';
import { ExerciseRequestDTO } from 'src/app/model/exercise/exercise-request-dto.model';
import { MediaFile } from 'src/app/model/media-file.model';
import { Tag } from 'src/app/model/tag.model';
import { User } from 'src/app/model/user.model';
import { ExerciseService } from 'src/app/service/exercise.service';
import { TagService } from 'src/app/service/tag.service';
import { ToastService } from 'src/app/service/toast.service';
import { getUser } from 'src/app/util/user-util';
import { TagSelectionComponent } from '../tag-selection/tag-selection.component';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.scss'],
})
export class ExerciseEditComponent implements OnInit {

  public pageTitle: string;

  public user: User;
  public exerciseId: number;
  public exercise: ExerciseRequestDTO = new ExerciseRequestDTO();

  public tags: Tag[] = [];
  public selectedTags: Tag[];
  public selectedFiles: MediaFile[] = [];

  public loading: boolean;

  constructor(
    private modalController: ModalController,
    private tagService: TagService,
    private toastService: ToastService,
    private exerciseService: ExerciseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.exerciseId = params['id']);
    this.pageTitle = this.exerciseId ? 'Edit exercise' : 'New exercise';
    this.user = getUser();
    this.getAllTags();
    if (this.exerciseId) {
      this.getExercise();
    }
  }

  public getExercise(): void {
    this.loading = true;
    this.exerciseService.findById(this.exerciseId).subscribe(
      (response: Exercise) => {
        this.convertToEdit(response);
      }, (error) => {
        console.error(error);
        this.toastService.error('Erro while getting exercise data!');
      }, () => {
        this.loading = false;
      });
  }

  public getAllTags(): void {
    this.loading = true;
    this.tagService.findAll().subscribe(
      (tags: Tag[]) => {
        this.tags = tags;
      }, (error) => {
        console.error(error);
        this.toastService.error('Error while retrieving tags!');
      }, () => {
        this.loading = false;
      });
  }

  public persistExercise() {
    this.loading = true;
    this.exerciseService.persistExercise(this.exercise).subscribe(
      (request) => {
        //this.router.navigate(['dashboard/profile']);
        this.toastService.success('Exercise successfully saved!');
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
    this.exercise.tagIds = this.selectedTags.map(tag => tag.id);
    this.exercise.fileIds = this.selectedFiles.map(file => file.id);
    this.exercise.creatorId = this.user?.id;
    this.persistExercise();
  }

  public convertToEdit(exercise: Exercise): void {
    this.exercise.id = exercise.id;
    this.exercise.title = exercise.title;
    this.exercise.description = exercise.description;
    this.exercise.material = exercise.material;
    this.selectedFiles = exercise.files;
    this.selectedTags = exercise.tags;
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
