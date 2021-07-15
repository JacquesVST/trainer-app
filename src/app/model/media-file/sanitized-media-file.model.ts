import { MediaFile } from './media-file.model';

import { SafeResourceUrl } from '@angular/platform-browser';
export class SanitizedMediaFile {
    sanitized: SafeResourceUrl;
    original: MediaFile;
}
