import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaFile } from '../model/media-file/media-file.model';
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

    public findById(fileId: number): Observable<MediaFile> {
        return this.http.get<MediaFile>(`${this.url}?fileId=${fileId}`);
    }

    public findAllImages(): Observable<MediaFile[]> {
        return this.http.get<MediaFile[]>(`${this.url}/images`);
    }

    public findAllVideos(): Observable<MediaFile[]> {
        return this.http.get<MediaFile[]>(`${this.url}/videos`);
    }

    public persistFile(file: File): Observable<MediaFile> {
        return this.http.post<MediaFile>(`${this.url}/upload`, file);
    }

    public persistFils(files: File[]): Observable<MediaFile[]> {
        return this.http.post<MediaFile[]>(`${this.url}/uploads`, files);
    }

}
