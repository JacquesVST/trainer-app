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
import { NavService } from './../../../service/nav.service';

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

    constructor(
        private userLibraryService: UserLibraryService,
        private toastService: ToastService,
        private imageService: ImageService,
        private route: ActivatedRoute,
        private modalController: ModalController,
        private loadingService: LoadingService,
        private navService: NavService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => (this.userLibraryId = params['id']));
        this.user = UserUtil.getUser();
        if (this.userLibraryId) {
            this.getUserLibrary();
        }
    }

    public async getUserLibrary() {
        await this.loadingService.show();
        this.userLibraryService.findById(this.userLibraryId).subscribe(
            (userLibrary: UserLibrary) => {
                this.userLibrary = userLibrary;
                this.training = this.userLibrary.training;
                this.pageTitle = this.training.title;
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

    public async persistUserLibrary() {
        await this.loadingService.show();
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
                this.toastService.error('processing_request', error);
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

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }

    public goBack() {
        this.navService.goBack();
    }
}
