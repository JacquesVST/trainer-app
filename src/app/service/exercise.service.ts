import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../model/exercise/exercise.model';
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
        return this.http.get<Exercise>(`${this.url}?id=${exerciseId}`);
    }

    public findAllByCreator(creatorId: number): Observable<Exercise[]> {
        return this.http.get<Exercise[]>(`${this.url}/creator?id=${creatorId}`);
    }

    public createExercise(exerciseCreateDTO: any): Observable<Exercise> {
        return this.http.post<Exercise>(`${this.url}`, exerciseCreateDTO);
    }

    public updateExercise(exerciseCreateDTO: any, exerciseId: number): Observable<Exercise> {
        return this.http.put<Exercise>(`${this.url}?id=${exerciseId}`, exerciseCreateDTO);
    }

}
