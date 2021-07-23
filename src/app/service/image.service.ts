import { MediaFile } from './../model/media-file/media-file.model';
import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from 'src/app/service/file.service';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    constructor(private fileService: FileService, private domSanitizer: DomSanitizer) {}

    public writeSrc(mediaFile: MediaFile): string {
        return `data:image/${mediaFile.type};base64, ${mediaFile.data}`;
    }

    public sanitizeImage(mediaFile: MediaFile): MediaFile {
        try {
            mediaFile.sanitized = this.domSanitizer.bypassSecurityTrustUrl(this.writeSrc(mediaFile));
            return mediaFile;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async getSanitizedImage(id: number) {
        const image = await this.fileService.findById(id).toPromise();
        if (image) {
            return this.sanitizeImage(image);
        } else {
            return null;
        }
    }

    public getDefaultImage(url?: string): MediaFile {
        const image = new MediaFile();
        image.sanitized = this.domSanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.domSanitizer.bypassSecurityTrustResourceUrl(url ? url : 'https://picsum.photos/500')
        );
        return image;
    }

    public async getSanitizedOrDefault(media: MediaFile) {
        if (media?.id) {
            if (media?.data) {
                return this.sanitizeImage(media);
            } else {
                return await this.getSanitizedImage(media.id);
            }
        } else {
            return this.getDefaultImage();
        }
    }

}
