import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/form/login.model';
import { User } from '../model/entity/user.model';
import { ServerService } from './server.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(
        private serverService: ServerService,
        private http: HttpClient
    ) { }

    private url: string = `${this.serverService.getServer()}/user`;

    public login(login: Login): Observable<User> {
        return this.http.post<User>(`${this.url}/login`, login);
    }

    public register(user: User): Observable<void> {
        return this.http.post<void>(this.url, user);
    }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }

}
