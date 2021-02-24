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

    private url: string = `${this.serverService.getServer()}/tag/`;


    public getAllTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(this.url);
    }

    public newTag(tag: Tag): Observable<void> {
        return this.http.post<void>(this.url, tag);
    }

}
