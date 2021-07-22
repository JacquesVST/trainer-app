import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Training } from 'src/app/model/training/training.model';
import { User } from 'src/app/model/user/user.model';
import { LoadingService } from 'src/app/service/loading.service';
import { ToastService } from 'src/app/service/toast.service';
import { TrainingService } from 'src/app/service/training.service';
import { UserLibraryService } from 'src/app/service/user-library.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';
import { UserLibraryRequestDTO } from '../../../model/user-library/user-library-request-dto.model';
import { UserLibrary } from '../../../model/user-library/user-library.model';
import { ImageService } from '../../../service/image.service';
import { UserViewComponent } from '../user-view/user-view.component';
import { NavService } from './../../../service/nav.service';

@Component({
    selector: 'app-training-view',
    templateUrl: './training-view.component.html',
    styleUrls: ['./training-view.component.scss']
})
export class TrainingViewComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public pageTitle: string;
    public libraryButton: string;

    public user: User;
    public trainingId: number;
    public training: Training = new Training();
    public userLibrary: UserLibrary;
    public userLibraryRequestDTO: UserLibraryRequestDTO = new UserLibraryRequestDTO();

    public trainingPicture: SafeResourceUrl;

    constructor(
        private userLibraryService: UserLibraryService,
        private toastService: ToastService,
        private trainingService: TrainingService,
        private imageService: ImageService,
        private route: ActivatedRoute,
        private modalController: ModalController,
        private loadingService: LoadingService,
        private navService: NavService
    ) {}

    ngOnInit() {
        this.libraryButton = this.literals.common.add_library;
        this.route.params.subscribe((params: Params) => (this.trainingId = params['id']));
        this.user = UserUtil.getUser();
        if (this.trainingId) {
            this.getTraining();
        }
    }

    public getTraining(): void {
        this.loadingService.show();
        this.trainingService.findByTrainingId(this.trainingId).subscribe(
            (training: Training) => {
                this.training = training;
                this.pageTitle = training.title;
                this.getLibrary();
                this.getImages();
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

    public getLibrary(): void {
        this.loadingService.show();
        this.userLibraryService.findByEndUserAndTraining(this.user.id, this.trainingId).subscribe(
            (userLibrary: UserLibrary) => {
                if (userLibrary) {
                    this.userLibrary = userLibrary;
                    this.libraryButton = this.literals.messages.already_in_library;
                }
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

    public persistUserLibrary(): void {
        this.loadingService.show();
        this.userLibraryService.persistUserLibrary(this.userLibraryRequestDTO).subscribe(
            (response: UserLibrary) => {
                this.userLibrary = response;
                this.libraryButton = this.literals.success_messages.added_to_library;
                this.toastService.success('added_to_library');
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

    public addToLibrary(): void {
        this.userLibraryRequestDTO.userId = this.user.id;
        this.userLibraryRequestDTO.trainingId = this.trainingId;
        this.persistUserLibrary();
    }

    public getImages() {
        if (this.training.picture?.data) {
            this.training.picture = this.imageService.sanitizeImage(this.training.picture);
        } else {
            this.training.picture = this.imageService.getDefaultImage();
        }

        if (this.training.creator?.picture?.data) {
            this.training.creator.picture = this.imageService.sanitizeImage(this.training.creator.picture);
        } else {
            this.training.creator.picture = this.imageService.getDefaultImage();
        }
    }

    public async openUserModal() {
        const modal = await this.modalController.create({
            component: UserViewComponent,
            componentProps: {
                user: this.training.creator
            }
        });

        return await modal.present();
    }

    public goBack() {
        this.navService.goBack();
    }
}
