import { SafeResourceUrl } from "@angular/platform-browser";

export class MediaFile {
    id: number;
    url: string;
    size: number;
    uuid: string;
    uploadDate: Date;
    name: string;
    originalName: string;
    type: string;
    data: any;
    sanitized: SafeResourceUrl;
}
