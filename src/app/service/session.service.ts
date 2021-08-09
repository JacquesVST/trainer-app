import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionRequestDTO } from '../model/session/session-request-dto.model';
import { Session } from '../model/session/session.model';
import { ServerService } from './server.service';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor(private serverService: ServerService, private http: HttpClient) {}

    private url: string = `${this.serverService.getServer()}/session`;

    public findById(sessionId: number): Observable<Session> {
        return this.http.get<Session>(`${this.url}?sessionId=${sessionId}`);
    }

    public findAllByUser(userId: number): Observable<Session[]> {
        return this.http.get<Session[]>(`${this.url}/user?userId=${userId}`);
    }

    public findAllByCreator(creatorId: number): Observable<Session[]> {
        return this.http.get<Session[]>(`${this.url}/creator?creatorId=${creatorId}`);
    }

    public persistSession(session: SessionRequestDTO): Observable<Session> {
        return this.http.post<Session>(this.url, session);
    }

    public deleteSession(sessionId: number): Observable<void> {
        return this.http.delete<void>(`${this.url}?sessionId=${sessionId}`);
    }
}
