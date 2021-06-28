import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({
    providedIn: 'root',
})
export class FileService {

    constructor(
        private serverService: ServerService,
        private http: HttpClient
    ) { }

    private url: string = `${this.serverService.getServer()}/file`;

    public findById(fileId: number): Observable<File> {
        return this.http.get<File>(`${this.url}?fileId=${fileId}`);
    }

    public findAllImages(): Observable<File[]> {
        return this.http.get<File[]>(`${this.url}/images`);
    }

    public findAllVideos(): Observable<File[]> {
        return this.http.get<File[]>(`${this.url}/videos`);
    }

    public persistFile(file: File): Observable<File> {
        return this.http.post<File>(`${this.url}/upload`, file);
    }

    public persistFils(files: File[]): Observable<File[]> {
        return this.http.post<File[]>(`${this.url}/uploads`, files);
    }

}
