import { MediaFile } from './../model/media-file/media-file.model';
import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/service/file.service';
import { SanitizedMediaFile } from '../model/media-file/sanitized-media-file.model';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    constructor(private fileService: FileService, private domSanitizer: DomSanitizer) {}

    public writeSrc(mediaFile: MediaFile): string {
        return `data:image/${mediaFile.type};base64, ${mediaFile.data}`;
    }

    public sanitizeImage(mediaFile: MediaFile): SafeResourceUrl {
        try {
            return this.domSanitizer.bypassSecurityTrustUrl(this.writeSrc(mediaFile));
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async getSanitizedImage(id: number): Promise<SanitizedMediaFile> {
        const image = await this.fileService.findById(id).toPromise();
        if (image) {
            return {
                sanitized: this.domSanitizer.bypassSecurityTrustUrl(this.writeSrc(image)),
                original: image
            };
        } else {
            return null;
        }
    }

    public getDefaultImage(url?: string) {
        return this.domSanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.domSanitizer.bypassSecurityTrustResourceUrl(url ? url : 'https://picsum.photos/200')
        );
    }
}
