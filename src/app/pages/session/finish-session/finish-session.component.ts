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
    selector: 'app-finish-session',
    templateUrl: './finish-session.component.html',
    styleUrls: ['./finish-session.component.scss']
})
export class FinishSessionComponent implements OnInit {
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
        private alertController: AlertController
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
                this.toastService.error('retrieving_items');
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public persistSession(session: SessionRequestDTO, sent: boolean) {
        this.sessionService.persistSession(session).subscribe(
            (session: Session) => {
                if (sent) {
                    this.toastService.success('item_saved');
                }
                this.goTo('dashboard/library');
            },
            (error) => {
                console.error(error);
                this.toastService.error('processing_request');
            },
            () => {}
        );
    }

    public async confirmDelete() {
        const confirm = await this.alertController.create({
            header: this.literals.form.confirmation,
            message: this.literals.messages.confirm_delete,
            buttons: [
                {
                    text: this.literals.common.no
                },
                {
                    text: this.literals.common.yes,
                    handler: () => {
                        this.deleteSession();
                    }
                }
            ]
        });

        confirm.present();
    }

    public deleteSession() {
        this.sessionService.deleteSession(this.sessionId).subscribe(
            () => {
                this.toastService.custom({
                    message: this.literals.success_messages.item_deleted
                });
                this.goTo('dashboard/library');
            },
            (error) => {
                console.error(error);
                this.toastService.error('processing_request');
            },
            () => {}
        );
    }

    public saveSession(sent: boolean) {
        const sessionRequestDTO: SessionRequestDTO = new SessionRequestDTO();
        sessionRequestDTO.id = this.sessionId;
        sessionRequestDTO.start = this.session.start;
        sessionRequestDTO.finish = this.session.finish;
        sessionRequestDTO.userLibraryId = this.session.userLibrary.id;
        sessionRequestDTO.sent = sent;
        sessionRequestDTO.observations = this.session.observations;
        this.persistSession(sessionRequestDTO, sent);
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
