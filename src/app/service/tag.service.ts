import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../model/tag.model';
import { ServerService } from './server.service';

@Injectable({
    providedIn: 'root',
})
export class TagService {

    constructor(
        private serverService: ServerService,
        private http: HttpClient
    ) { }

    private url: string = `${this.serverService.getServer()}/tag`;

    public findAll(): Observable<Tag[]> {
        return this.http.get<Tag[]>(this.url);
    }

    public persistTag(tag: Tag): Observable<Tag> {
        return this.http.post<Tag>(this.url, tag);
    }

}
