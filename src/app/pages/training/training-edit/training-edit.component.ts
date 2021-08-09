import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ClipboardService } from 'ngx-clipboard';
import { MediaFile } from 'src/app/model/media-file/media-file.model';
import { Tag } from 'src/app/model/tag.model';
import { TrainingRequestDTO } from 'src/app/model/training/training-request-dto.model';
import { Training } from 'src/app/model/training/training.model';
import { User } from 'src/app/model/user/user.model';
import { ImageService } from 'src/app/service/image.service';
import { LoadingService } from 'src/app/service/loading.service';
import { ToastService } from 'src/app/service/toast.service';
import { TrainingService } from 'src/app/service/training.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';
import { TagSelectionComponent } from '../../tag/tag-selection/tag-selection.component';
import { FileService } from './../../../service/file.service';
import { NavService } from './../../../service/nav.service';
@Component({
    selector: 'app-training-edit',
    templateUrl: './training-edit.component.html',
    styleUrls: ['./training-edit.component.scss']
})
export class TrainingEditComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public pageTitle: string;

    public user: User;
    public trainingId: number;
    public training: TrainingRequestDTO = new TrainingRequestDTO();

    public selectedTags: Tag[];
    public selectedPicture: MediaFile;
    public publish: boolean = true;

    constructor(
        private modalController: ModalController,
        private toastService: ToastService,
        private trainingService: TrainingService,
        private route: ActivatedRoute,
        private loadingService: LoadingService,
        private navService: NavService,
        private fileService: FileService,
        private imageService: ImageService,
        private clipboard: ClipboardService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => (this.trainingId = params['id']));
        this.pageTitle = this.literals.pages[this.trainingId ? 'edit_training' : 'new_training'];
        this.user = UserUtil.getUser();
        if (this.trainingId) {
            this.getTraining();
        }
    }

    public async getTraining() {
        await this.loadingService.show();
        this.trainingService.findByTrainingId(this.trainingId).subscribe(
            (response: Training) => {
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

    public async persistTraining() {
        await this.loadingService.show();
        this.trainingService.persistTraining(this.training).subscribe(
            (response: Training) => {
                if (!this.trainingId) {
                    this.trainingId = response?.id;
                    this.training.id = this.trainingId;
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

    public async saveSelectedImage(event) {
        const file = event?.target?.files[0];
        if (file) {
            await this.loadingService.show();
            this.fileService.persistFile(file).subscribe(
                (response: MediaFile) => {
                    this.selectedPicture = this.imageService.sanitizeImage(response);
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
        this.training.pictureId = this.selectedPicture?.id;
        this.training.creatorId = this.user?.id;
        this.training.tagIds = this.selectedTags ? this.selectedTags.map((tag) => tag.id) : [];
        this.persistTraining();
    }

    public async convertToEdit(training: Training) {
        this.training.id = training.id;
        this.training.title = training.title;
        this.training.description = training.description;
        this.training.published = !!training.published;
        this.training.code = training.code;
        if (training?.tags) {
            this.training.tagIds = training.tags ? training.tags.map((tag) => tag.id) : [];
            this.selectedTags = training.tags;
        }
        if (training?.picture) {
            this.training.pictureId = training.picture?.id;
            this.selectedPicture = await this.imageService.getSanitizedOrDefault(training.picture);
        }
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

    public copyCode(): void {
        this.clipboard.copyFromContent(this.training.code);
        this.toastService.custom({
            message: this.literals.messages.code_copied,
            color: 'primary'
        });
    }

    public openImageSelection() {
        const element = document.getElementById('file-input');
        element.click();
    }

    public goBack() {
        this.navService.goBack();
    }
}
