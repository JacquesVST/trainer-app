import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../model/exercise/exercise.model';
import { ExerciseRequestDTO } from './../model/exercise/exercise-request-dto.model';
import { ServerService } from './server.service';

@Injectable({
    providedIn: 'root',
})
export class ExerciseService {

    constructor(
        private serverService: ServerService,
        private http: HttpClient
    ) { }

    private url: string = `${this.serverService.getServer()}/exercise`;

    public findById(exerciseId: number): Observable<Exercise> {
        return this.http.get<Exercise>(`${this.url}?exerciseId=${exerciseId}`);
    }

    public findAllByCreator(creatorId: number): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${this.url}/creator?creatorId=${creatorId}`);
    }

    public persistExercise(exerciseRequestDTO: ExerciseRequestDTO): Observable<Exercise> {
        return this.http.post<Exercise>(`${this.url}`, exerciseRequestDTO);
    }

}
