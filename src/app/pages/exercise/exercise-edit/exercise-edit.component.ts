import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExerciseCreateDTO } from 'src/app/model/exercise/exercise-create-dto.model';
import { Exercise } from 'src/app/model/exercise/exercise.model';
import { Image } from 'src/app/model/image.model';
import { Tag } from 'src/app/model/tag.model';
import { User } from 'src/app/model/user/user.model';
import { Video } from 'src/app/model/video.model';
import { ExerciseService } from 'src/app/service/exercise.service';
import { TagService } from 'src/app/service/tag.service';
import { ToastService } from 'src/app/service/toast.service';
import { getUser } from 'src/app/util/user-util';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.scss'],
})
export class ExerciseEditComponent implements OnInit {

  public user: User;
  public videoId = 1;
  public exerciseId: number;
  public exercise: ExerciseCreateDTO = new ExerciseCreateDTO();

  public tags: Tag[] = [];
  public selectedTags: Tag[] = [];

  public images: Image[] = [];
  public selectedImages: Image[] = [];

  public video: Video;

  public spinnerRequest: boolean;
  public spinnerTags: boolean;

  constructor(
    private tagService: TagService,
    private toastService: ToastService,
    private exerciseService: ExerciseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.exerciseId = params['id']);
    this.user = getUser();
    this.getAllTags();
    if (this.exerciseId) {
      this.spinnerRequest = true;
      this.getExercise();
    }
  }

  public getExercise(): void {
    this.exerciseService.findById(this.exerciseId).subscribe(
      (response: Exercise) => {
        this.convertToEdit(response);
      }, (err) => {
        console.log(err);
        this.toastService.error('Erro ao buscar tags!');
      }, () => {
        this.spinnerRequest = false;
      })

  }

  public getAllTags(): void {
    this.spinnerTags = true;
    this.tags = [];
    this.tagService.getAllTags().subscribe(
      (tags: Tag[]) => {
        this.tags = tags;
      }, (err) => {
        this.toastService.error('Erro ao buscar tags!');
        console.log(err);
      }, () => {
        this.spinnerTags = false;
      }
    );
  }

  public createExercise() {
    this.spinnerRequest = true;
    this.exerciseService.createExercise(this.exercise).subscribe(
      (request) => {
        this.toastService.success('Exercise successfully registered!');
      },
      (error) => {
        console.error(error)
        this.toastService.error('Error while processing your request!');
      },
      () => {
        this.spinnerRequest = false
        this.exercise = new ExerciseCreateDTO();
      }
    );
  }

  public updateExercise() {
    this.spinnerRequest = true;
    this.exerciseService.updateExercise(this.exercise, this.exerciseId).subscribe(
      (request) => {
        this.toastService.success('Exercise successfully altered!');
        this.router.navigate(['/dashboard/profile']);
      },
      (error) => {
        console.error(error)
        this.toastService.error('Error while processing your request!');
      },
      () => {
        this.spinnerRequest = false
      }
    );
  }

  public prepareModel(): void {
    this.exercise.tagIds = this.selectedTags.map(tag => tag.id);
    this.exercise.imageIds = this.selectedImages.map(image => image.id);
    this.exercise.videoId = this.video?.id || null;
    this.exercise.creatorId = this.user?.id;
    this.exerciseId ? this.updateExercise() : this.createExercise();
  }

  public convertToEdit(exercise: Exercise): void {
    this.exercise.title = exercise.title;
    this.exercise.description = exercise.description;
    this.exercise.material = exercise.material;
    this.video = exercise.video;

    for (const tag of exercise.tags) {
      this.selectedTags.push(this.tags.find(t => t.id === tag.id))
    }

    for (const image of exercise.images) {
      this.selectedImages.push(this.images.find(i => i.id === image.id))
    }
  }

}
