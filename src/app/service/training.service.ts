import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from '../model/training.model';
import { TrainingRequestDTO } from '../model/training/training-request-dto.model';
import { ServerService } from './server.service';

@Injectable({
    providedIn: 'root',
})
export class TrainingService {

    constructor(
        private serverService: ServerService,
        private http: HttpClient
    ) { }

    private url: string = `${this.serverService.getServer()}/training`;

    public findAll(): Observable<Training[]> {
        return this.http.get<Training[]>(`${this.url}/all`);
    }

    public findAllByCreator(creatorId: number): Observable<Training[]> {
        return this.http.get<Training[]>(`${this.url}/creator?creatorId=${creatorId}`);
    }

    public findByTrainingId(trainingId: number): Observable<Training> {
        return this.http.get<Training>(`${this.url}?trainingId=${trainingId}`)
    }

    public persistTraining(trainingRequestDTO: TrainingRequestDTO): Observable<Training> {
        return this.http.post<Training>(this.url, trainingRequestDTO)
    }

}
