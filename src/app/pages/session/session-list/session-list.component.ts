import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/model/session/session.model';
import { User } from 'src/app/model/user/user.model';
import { ImageService } from 'src/app/service/image.service';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { SessionService } from 'src/app/service/session.service';
import { ToastService } from 'src/app/service/toast.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';

@Component({
    selector: 'app-session-list',
    templateUrl: './session-list.component.html',
    styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public user: User;
    public showUser: boolean;
    public sessions: Session[] = [];

    constructor(
        private toastService: ToastService,
        private sessionService: SessionService,
        private navService: NavService,
        private loadingService: LoadingService,
        private imageService: ImageService
    ) {}

    ngOnInit() {
        this.user = UserUtil.getUser();
        this.showUser = this.user.type === 'TRAINER';
        if (this.showUser) {
            this.findAllSessionsCreator();
        } else {
            this.findAllSessionsUser();
        }
    }

    ionViewDidEnter() {
        this.ngOnInit();
    }

    public async findAllSessionsUser() {
        await this.loadingService.show();
        this.sessionService.findAllByUser(this.user.id).subscribe(
            (sessions: Session[]) => {
                this.processImages(sessions);
            },
            (error) => {
                this.toastService.error('retrieving_items', error);
                console.error(error);
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public async findAllSessionsCreator() {
        await this.loadingService.show();
        this.sessionService.findAllByCreator(this.user.id).subscribe(
            (sessions: Session[]) => {
                this.processImages(sessions);
            },
            (error) => {
                this.toastService.error('retrieving_items', error);
                console.error(error);
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public async processImages(sessions) {
        for (let item of sessions) {
            item.picture = await this.imageService.getSanitizedOrDefault(item?.picture);
        }
        this.sessions = sessions;
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }

    public goBack() {
        this.navService.goBack();
    }
}
