import { MediaFile } from "../media-file.model";
import { Tag } from "../tag.model";
import { User } from "../user/user.model";

export class Exercise {
    id: number;
    title: string;
    description: string;
    material: string;
    creator: User;
    files: MediaFile[];
    tags: Tag[];
}