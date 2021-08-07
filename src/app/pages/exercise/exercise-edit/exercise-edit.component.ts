import { ImageService } from 'src/app/service/image.service';
import { FileService } from 'src/app/service/file.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ExerciseRequestDTO } from 'src/app/model/exercise/exercise-request-dto.model';
import { Exercise } from 'src/app/model/exercise/exercise.model';
import { MediaFile } from 'src/app/model/media-file/media-file.model';
import { Tag } from 'src/app/model/tag.model';
import { User } from 'src/app/model/user/user.model';
import { ExerciseService } from 'src/app/service/exercise.service';
import { LoadingService } from 'src/app/service/loading.service';
import { ToastService } from 'src/app/service/toast.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';
import { TagSelectionComponent } from '../../tag/tag-selection/tag-selection.component';
import { NavService } from './../../../service/nav.service';

@Component({
    selector: 'app-exercise-edit',
    templateUrl: './exercise-edit.component.html',
    styleUrls: ['./exercise-edit.component.scss']
})
export class ExerciseEditComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public pageTitle: string;

    public user: User;
    public exerciseId: number;
    public exercise: ExerciseRequestDTO = new ExerciseRequestDTO();

    public hasMaterial: boolean = false;
    public selectedTags: Tag[];
    public selectedFiles: MediaFile[] = [];

    constructor(
        private modalController: ModalController,
        private toastService: ToastService,
        private exerciseService: ExerciseService,
        private route: ActivatedRoute,
        private loadingService: LoadingService,
        private navService: NavService,
        private fileService: FileService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => (this.exerciseId = params['id']));
        this.pageTitle = this.literals.pages[this.exerciseId ? 'edit_exercise' : 'new_exercise'];
        this.user = UserUtil.getUser();
        if (this.exerciseId) {
            this.getExercise();
        }
    }

    public async getExercise() {
        await this.loadingService.show();
        this.exerciseService.findById(this.exerciseId).subscribe(
            (response: Exercise) => {
                this.convertToEdit(response);
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items');
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public async persistExercise() {
        await this.loadingService.show();
        this.exerciseService.persistExercise(this.exercise).subscribe(
            (response: Exercise) => {
                if (!this.exerciseId) {
                    this.exerciseId = response?.id;
                    this.exercise.id = this.exerciseId;
                }
                this.toastService.success('item_saved');
            },
            (error) => {
                console.error(error);
                this.toastService.error('processing_request');
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public async saveSelectedImages(event) {
        let files = event?.target?.files;
        if (files) {
            await this.loadingService.show();
            files = Array.from(files);
            this.fileService.persistFiles(files).subscribe(
                (response: MediaFile[]) => {
                    console.log(response);
                    this.selectedFiles = response;
                },
                (error) => {
                    console.error(error);
                    this.toastService.error('processing_request');
                },
                () => {
                    this.loadingService.hide();
                }
            );
        }
    }

    public prepareModel(): void {
        this.exercise.tagIds = this.selectedTags ? this.selectedTags.map((tag) => tag.id) : [];
        this.exercise.fileIds = this.selectedFiles ? this.selectedFiles.map((file) => file.id) : [];
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

        modal.onDidDismiss().then((data) => {
            if (data.data) {
                this.selectedTags = data.data;
            }
        });

        return await modal.present();
    }

    public openImageSelection() {
        const element = document.getElementById('file-input');
        element.click();
    }

    public goBack() {
        this.navService.goBack();
    }
}
