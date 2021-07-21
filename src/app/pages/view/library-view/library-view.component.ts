import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Training } from 'src/app/model/training/training.model';
import { UserLibraryRequestDTO } from 'src/app/model/user-library/user-library-request-dto.model';
import { UserLibrary } from 'src/app/model/user-library/user-library.model';
import { User } from 'src/app/model/user/user.model';
import { ImageService } from 'src/app/service/image.service';
import { LoadingService } from 'src/app/service/loading.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserLibraryService } from 'src/app/service/user-library.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';
import { UserViewComponent } from '../user-view/user-view.component';

@Component({
    selector: 'app-library-view',
    templateUrl: './library-view.component.html',
    styleUrls: ['./library-view.component.scss']
})
export class LibraryViewComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public pageTitle: string;

    public user: User;
    public training: Training;
    public userLibrary: UserLibrary;
    public userLibraryId: number;
    public userLibraryRequestDTO: UserLibraryRequestDTO = new UserLibraryRequestDTO();

    public trainingPicture: SafeResourceUrl;
    public userPicture: SafeResourceUrl;

    constructor(
        private userLibraryService: UserLibraryService,
        private toastService: ToastService,
        private imageService: ImageService,
        private route: ActivatedRoute,
        private modalController: ModalController,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => (this.userLibraryId = params['id']));
        this.user = UserUtil.getUser();
        if (this.userLibraryId) {
            this.getUserLibrary();
        }
    }

    public getUserLibrary(): void {
        this.loadingService.show();
        this.userLibraryService.findById(this.userLibraryId).subscribe(
            (userLibrary: UserLibrary) => {
                this.userLibrary = userLibrary;
                this.training = this.userLibrary.training;
                this.pageTitle = this.training.title;
                this.getImage();
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
                this.toastService.custom({
                    message: this.literals.messages[response.favorite ? 'added_favorite' : 'removed_favorite'],
                    duration: 2000,
                    color: response.favorite ? 'success' : 'light',
                    position: 'bottom'
                });
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

    public updateFavorite(): void {
        this.userLibraryRequestDTO.id = this.userLibrary.id;
        this.userLibraryRequestDTO.userId = this.userLibrary.endUser.id;
        this.userLibraryRequestDTO.trainingId = this.userLibrary.training.id;
        this.userLibraryRequestDTO.favorite = !this.userLibrary.favorite;
        this.persistUserLibrary();
    }

    public getImage() {
        if (this.training.creator?.picture?.data) {
            this.userPicture = this.imageService.sanitizeImage(this.training.creator.picture);
        } else {
            this.userPicture = this.imageService.getDefaultImage();
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
}
