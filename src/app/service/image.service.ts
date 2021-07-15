import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from 'src/app/service/file.service';
import { SanitizedMediaFile } from '../model/media-file/sanitized-media-file.model';

@Injectable({
    providedIn: 'root',
})
export class ImageService {

    constructor(
        private fileService: FileService,
        private domSanitizer: DomSanitizer
    ) { }

    public async getSanitizedImage(id: number): Promise<SanitizedMediaFile> {
        const image = await this.fileService.findById(id).toPromise();
        if (image) {
            let mediaData: string = 'data:image/';
            mediaData += image.type;
            mediaData += ';base64, ';
            mediaData += image.data;
            return {
                sanitized: this.domSanitizer.bypassSecurityTrustUrl(mediaData),
                original: image
            };
        } else {
            return null;
        }
    }

    public getDefaultImage(url?: string) {
        return this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, this.domSanitizer.bypassSecurityTrustResourceUrl(url ? url : 'https://picsum.photos/200'));
    }
}
