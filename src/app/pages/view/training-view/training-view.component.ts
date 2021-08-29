import { Component, OnInit } from '@angular/core';
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
    public trainingCode: string;
    public training: Training = new Training();
    public userLibrary: UserLibrary;
    public userLibraryRequestDTO: UserLibraryRequestDTO = new UserLibraryRequestDTO();

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
        this.route.params.subscribe((params: Params) => (this.trainingCode = params['code']));
        this.user = UserUtil.getUser();
        if (this.trainingCode) {
            this.getTraining();
        }
    }

    public async getTraining() {
        await this.loadingService.show();
        this.trainingService.findByCode(this.trainingCode).subscribe(
            (training: Training) => {
                this.training = training;
                this.pageTitle = training.title;
                this.getLibrary();
                this.getImages();
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items', error);
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public async getLibrary() {
        await this.loadingService.show();
        this.userLibraryService.findByEndUserAndTraining(this.user.id, this.training.id).subscribe(
            (userLibrary: UserLibrary) => {
                if (userLibrary) {
                    this.userLibrary = userLibrary;
                    this.libraryButton = this.literals.messages.already_in_library;
                }
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items', error);
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public async persistUserLibrary() {
        await this.loadingService.show();
        this.userLibraryService.persistUserLibrary(this.userLibraryRequestDTO).subscribe(
            (response: UserLibrary) => {
                this.userLibrary = response;
                this.libraryButton = this.literals.success_messages.added_to_library;
                this.toastService.success('added_to_library');
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items', error);
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public addToLibrary(): void {
        this.userLibraryRequestDTO.userId = this.user.id;
        this.userLibraryRequestDTO.trainingId = this.training.id;
        this.persistUserLibrary();
    }

    public async getImages() {
        this.training.picture = await this.imageService.getSanitizedOrDefault(this.training?.picture);
        this.training.creator.picture = await this.imageService.getSanitizedOrDefault(this.training?.creator?.picture);
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
