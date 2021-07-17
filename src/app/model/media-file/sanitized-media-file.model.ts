import { SafeResourceUrl } from '@angular/platform-browser';
import { MediaFile } from './media-file.model';

export class SanitizedMediaFile {
    sanitized: SafeResourceUrl;
    original: MediaFile;
}
