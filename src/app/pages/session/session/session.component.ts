import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Activity } from 'src/app/model/activity/activity.model';
import { SessionService } from 'src/app/service/session.service';
import { ToastService } from 'src/app/service/toast.service';
import { Session } from '../../../model/session/session.model';
import { SessionRequestDTO } from './../../../model/session/session-request-dto.model';
import { UserLibrary } from './../../../model/user-library/user-library.model';
import { ActivityService } from './../../../service/activity.service';
import { NavService } from './../../../service/nav.service';
import { UserLibraryService } from './../../../service/user-library.service';
import { Literals } from './../../../util/literal-util';

@Component({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public libraryId: number;

    public library: UserLibrary;
    public activities: Activity[];
    public currentActivity: Activity;
    public activityIndex: number = 0;
    public currentSession: Session;

    constructor(
        private route: ActivatedRoute,
        private userLibraryService: UserLibraryService,
        private activityService: ActivityService,
        private sessionService: SessionService,
        private toastService: ToastService,
        private navService: NavService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => (this.libraryId = params['id']));
        if (this.libraryId) {
            this.getLibrary();
        }
    }

    public async getLibrary() {
        this.userLibraryService.findById(this.libraryId).subscribe(
            (library: UserLibrary) => {
                this.library = library;
                this.loadActivities();
                this.newSession();
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items');
            },
            () => {}
        );
    }

    public async loadActivities() {
        this.activityService.findAllByTraining(this.library.training.id).subscribe(
            (activities: Activity[]) => {
                this.activities = activities;
                this.goToActivity(0);
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items');
            },
            () => {}
        );
    }

    public async persistSession(session: SessionRequestDTO, leave: boolean = false) {
        this.sessionService.persistSession(session).subscribe(
            (session: Session) => {
                this.currentSession = session;
                if (leave) {
                    this.goTo('session/finish', this.currentSession.id);
                }
            },
            (error) => {
                console.error(error);
                this.toastService.error('processing_request');
            },
            () => {}
        );
    }

    public finishSession() {
        const session: SessionRequestDTO = new SessionRequestDTO();
        session.id = this.currentSession.id;
        session.start = this.currentSession.start;
        session.userLibraryId = this.currentSession.userLibrary.id;
        this.persistSession(session, true);
    }

    public newSession() {
        const session: SessionRequestDTO = new SessionRequestDTO();
        session.userLibraryId = this.library.id;
        this.persistSession(session);
    }

    public goToActivity(direction: number) {
        this.activityIndex = this.activityIndex + direction;
        this.currentActivity = this.activities[this.activityIndex];
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }
}
