import { Component, OnInit } from '@angular/core';
import { MediaFile } from 'src/app/model/media-file/media-file.model';
import { UserRequestDTO } from 'src/app/model/user/user-request-dto.model';
import { User } from 'src/app/model/user/user.model';
import { FileService } from 'src/app/service/file.service';
import { ImageService } from 'src/app/service/image.service';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public currentUser: User;
    public user: UserRequestDTO = new UserRequestDTO();
    public selectedPicture: MediaFile;
    public datePickerOptions: any;

    constructor(
        private userService: UserService,
        private imageService: ImageService,
        private loadingService: LoadingService,
        private fileService: FileService,
        private toastService: ToastService,
        private navService: NavService
    ) {}

    ngOnInit() {
        this.getUser();
        this.datePickerOptions = {
          displayFormat: 'DD MMM YYYY',
          pickerFormat: 'YYYY MMM DD',
          slot: 'end',
          max: new Date().toISOString(),
          monthShortNames: this.literals.months_short,
          cancelText: this.literals.common.cancel,
          doneText: this.literals.common.ok
      };
    }

    public async getUser() {
        await this.loadingService.show();
        this.userService.getUser(UserUtil.getUser().id).subscribe(
            (user: User) => {
                this.currentUser = user;
                this.convertToEdit(this.currentUser);
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

    public async persistUser() {
        await this.loadingService.show();
        this.userService.updateUser(this.user).subscribe(
            (response: User) => {
                UserUtil.setUser(response);
                this.toastService.success('item_saved');
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

    public async prepareModel() {
        this.user.pictureId = this.selectedPicture?.id;
        await this.persistUser();
    }

    public async convertToEdit(user: User) {
        this.user.id = user.id;
        this.user.username = user.username;
        this.user.pass = user.pass;
        this.user.email = user.email;
        this.user.type = user.type;

        this.user.firstName = user.firstName;
        this.user.lastName = user.lastName;
        this.user.phoneNumber = user.phoneNumber;
        this.user.birth = user.birth;
        if (user?.picture) {
            this.user.pictureId = user.picture.id;
            this.selectedPicture = await this.imageService.getSanitizedOrDefault(user.picture);
        }
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
                    this.toastService.error('processing_request', error);
                },
                () => {
                    this.loadingService.hide();
                }
            );
        }
    }

    public openImageSelection() {
        const element = document.getElementById('file-input');
        element.click();
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }
}
