import { Component, OnInit } from '@angular/core';
import { UserLibrary } from 'src/app/model/user-library/user-library.model';
import { User } from 'src/app/model/user/user.model';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserLibraryService } from 'src/app/service/user-library.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';

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
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.loadingService.show();
        this.user = UserUtil.getUser();
        this.getLibrary();
    }

    public getLibrary(refresh?) {
        this.userLibraryService.findAllByUser(this.user.id).subscribe(
            (library: UserLibrary[]) => {
                this.library = library;
                this.processFavorites();
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

    public processFavorites(): void {
        this.favorites = [];
        for (const lib of this.library) {
            if (lib.favorite) {
                this.favorites.push(this.library.shift());
            }
        }
    }

    public doRefresh(event) {
        this.getLibrary(event);
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }
}
