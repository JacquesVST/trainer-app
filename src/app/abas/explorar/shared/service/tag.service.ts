import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/shared/model/tag.model';
import { ServidorService } from 'src/app/shared/service/servidor.service';

@Injectable({
    providedIn: 'root'
})

export class TagService {

    private url: string = this.servidorService.getServidor() + 'tag';

    constructor(
        private http: HttpClient,
        private servidorService: ServidorService) { }

    public listarTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(this.url);
    }

    public buscarTag(idTag: number): Observable<Tag> {
        return this.http.get<Tag>(this.url + '/' + idTag);
    }

}
