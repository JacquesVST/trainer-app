import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Login } from '../model/user/login.model';
import { UserRequestDTO } from './../model/user/user-request-dto.model';
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

    public registerUser(userRequestDTO: UserRequestDTO): Observable<User> {
        return this.http.post<User>(this.url, userRequestDTO);
    }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }

}
