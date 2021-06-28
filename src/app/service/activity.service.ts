import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from './../model/activity.model';
import { ActivityRequestDTO } from './../model/activity/activity-request-dto.mode';
import { ServerService } from './server.service';

@Injectable({
    providedIn: 'root',
})
export class ActivityService {

    constructor(
        private serverService: ServerService,
        private http: HttpClient
    ) { }

    private url: string = `${this.serverService.getServer()}/activity`;

    public findAllByTraining(trainingId: number): Observable<Activity[]> {
        return this.http.get<Activity[]>(`${this.url}/?trainingId=${trainingId}`);
    }

    public persistActivity(activityRequestDTO: ActivityRequestDTO): Observable<Activity> {
        return this.http.post<Activity>(`${this.url}`, activityRequestDTO);
    }

    public persistActivities(activityRequestDTOList: ActivityRequestDTO[]): Observable<Activity[]> {
        return this.http.post<Activity[]>(`${this.url}/list`, activityRequestDTOList);
    }

    public deleteActivity(activityId: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/?activityId=${activityId}`);
    }

}
