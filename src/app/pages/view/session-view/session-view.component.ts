import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Session } from 'src/app/model/session/session.model';
import { Training } from 'src/app/model/training/training.model';
import { ImageService } from 'src/app/service/image.service';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { ToastService } from 'src/app/service/toast.service';
import { SessionRequestDTO } from './../../../model/session/session-request-dto.model';
import { SessionService } from './../../../service/session.service';
import { Literals } from './../../../util/literal-util';

@Component({
    selector: 'app-session-view',
    templateUrl: './session-view.component.html',
    styleUrls: ['./session-view.component.scss']
})
export class SessionViewComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public sessionId: number;
    public session: Session;
    public training: Training;
    public datePickerOptions: any;

    constructor(
        private sessionService: SessionService,
        private toastService: ToastService,
        private route: ActivatedRoute,
        private loadingService: LoadingService,
        private imageService: ImageService,
        private navService: NavService,
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => (this.sessionId = params['id']));
        if (this.sessionId) {
            this.getSession();
        }
        this.datePickerOptions = {
            displayFormat: 'DD MMM YYYY HH:mm',
            pickerFormat: 'YYYY MMM DD HH:mm',
            slot: 'end',
            max: new Date().toISOString(),
            monthShortNames: this.literals.months_short,
            cancelText: this.literals.common.cancel,
            doneText: this.literals.common.ok
        };
    }

    public async getSession() {
        await this.loadingService.show();
        this.sessionService.findById(this.sessionId).subscribe(
            (response: Session) => {
                this.session = response;
                this.training = this.session.userLibrary.training;
                this.processImages();
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

    public async processImages() {
        this.training.picture = await this.imageService.getSanitizedOrDefault(this.training.picture);
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }

    public goBack() {
        this.navService.goBack();
    }
}
