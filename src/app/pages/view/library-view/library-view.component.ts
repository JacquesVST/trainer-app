import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Training } from 'src/app/model/training/training.model';
import { UserLibraryRequestDTO } from 'src/app/model/user-library/user-library-request-dto.model';
import { UserLibrary } from 'src/app/model/user-library/user-library.model';
import { User } from 'src/app/model/user/user.model';
import { ImageService } from 'src/app/service/image.service';
import { ToastService } from 'src/app/service/toast.service';
import { TrainingService } from 'src/app/service/training.service';
import { UserLibraryService } from 'src/app/service/user-library.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';

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
    public loading: boolean;

    constructor(
        private userLibraryService: UserLibraryService,
        private toastService: ToastService,
        private imageService: ImageService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => (this.userLibraryId = params['id']));
        this.user = UserUtil.getUser();
        if (this.userLibraryId) {
            this.getUserLibrary();
        }
    }

    public getUserLibrary(): void {
        this.loading = true;
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
                this.loading = false;
            }
        );
    }

    public persistUserLibrary(): void {
        this.loading = true;
        this.userLibraryService.persistUserLibrary(this.userLibraryRequestDTO).subscribe(
            (response: UserLibrary) => {
                this.userLibrary = response;
            },
            (error) => {
                console.error(error);
                this.toastService.error('processing_request');
            },
            () => {
                this.loading = false;
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
            this.trainingPicture = this.imageService.sanitizeImage(this.training.creator.picture);
        } else {
            this.trainingPicture = this.imageService.getDefaultImage();
        }
    }
}
