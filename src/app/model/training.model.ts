import { MediaFile } from "./media-file.model";
import { Tag } from "./tag.model";
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
    tags: Tag[];
}