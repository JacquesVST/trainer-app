import { UserLibraryService } from 'src/app/service/user-library.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { Literals } from 'src/app/util/literal-util';
import { UserLibrary } from 'src/app/model/user-library/user-library.model';
import { User } from 'src/app/model/user/user.model';
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
    public loading: boolean = false;

    public user: User;

    constructor(
        private userLibraryService: UserLibraryService,
        private toastService: ToastService,
        private router: Router
    ) {}

    ngOnInit() {
        this.user = UserUtil.getUser();
        this.getLibrary();
    }

    public getLibrary(refresh?) {
        this.loading = true;
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
                this.loading = false;
                if (refresh) {
                    setTimeout(() => refresh.target.complete(), 0);
                }
            }
        );
    }

    public processFavorites(): void {
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
        param ? this.router.navigate([url, param]) : this.router.navigate([url]);
    }
}
