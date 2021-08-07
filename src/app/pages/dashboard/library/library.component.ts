import { ImageService } from 'src/app/service/image.service';
import { Component, OnInit } from '@angular/core';
import { UserLibrary } from 'src/app/model/user-library/user-library.model';
import { User } from 'src/app/model/user/user.model';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserLibraryService } from 'src/app/service/user-library.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public library: UserLibrary[] = [];
    public favorites: UserLibrary[] = [];

    public user: User;

    constructor(
        private userLibraryService: UserLibraryService,
        private toastService: ToastService,
        private navService: NavService,
        private loadingService: LoadingService,
        private imageService: ImageService,
        private alertController: AlertController
    ) {}

    ngOnInit() {
        this.user = UserUtil.getUser();
        this.getLibrary();
    }

    public async getLibrary(refresh?) {
        if (!refresh) {
            await this.loadingService.show();
        }
        this.userLibraryService.findAllByUser(this.user.id).subscribe(
            (library: UserLibrary[]) => {
                this.processImages(library);
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items');
            },
            () => {
                if (refresh) {
                    setTimeout(() => refresh.target.complete(), 0);
                } else {
                    this.loadingService.hide();
                }
            }
        );
    }

    public async processImages(library: UserLibrary[]) {
        for (let item of library) {
            item.training.picture = await this.imageService.getSanitizedOrDefault(item?.training?.picture);
        }
        this.library = library;
        this.processFavorites();
    }

    public processFavorites(): void {
        this.favorites = [];
        for (const lib of this.library) {
            if (lib.favorite) {
                this.favorites.push(this.library.shift());
            }
        }
    }

    public async openCodeModal() {
        const modal = await this.alertController.create({
            header: this.literals.pages.add_from_code,
            inputs: [
                {
                    name: 'code',
                    type: 'text',
                    attributes: {
                        maxlength: 6
                    }
                }
            ],
            buttons: [
                {
                    text: this.literals.common.cancel,
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: this.literals.common.ok,
                    role: 'add',
                    handler: (data) => {
                        this.goTo('view/training', data.code);
                    }
                }
            ]
        });

        await modal.present();
    }

    public doRefresh(event) {
        this.getLibrary(event);
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }
}
