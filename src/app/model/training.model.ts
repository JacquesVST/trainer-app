import { MediaFile } from "./media-file.model";
import { User } from "./user.model";

export class Training {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: number;
    published: Date;
    creator: User;
    picture: MediaFile;
}