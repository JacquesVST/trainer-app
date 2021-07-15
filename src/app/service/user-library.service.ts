import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLibrary } from '../model/user-library/user-library.model';
import { UserLibraryRequestDTO } from './../model/user-library/user-library-request-dto.model';
import { ServerService } from './server.service';

@Injectable({
    providedIn: 'root',
})
export class UserLibraryService {

    constructor(
        private serverService: ServerService,
        private http: HttpClient
    ) { }

    private url: string = `${this.serverService.getServer()}/user-library`;

    public findAll(): Observable<UserLibrary[]> {
        return this.http.get<UserLibrary[]>(this.url);
    }

    public findAllByUser(userId: number): Observable<UserLibrary[]> {
        return this.http.get<UserLibrary[]>(`${this.url}/user?userId=${userId}`);
    }

    public findAllByTraining(trainingId: number): Observable<UserLibrary[]> {
        return this.http.get<UserLibrary[]>(`${this.url}/training?trainingId=${trainingId}`);
    }

    public persistUserLibrary(userLibraryRequestDTO: UserLibraryRequestDTO): Observable<UserLibrary> {
        return this.http.post<UserLibrary>(this.url, userLibraryRequestDTO);
    }

}
