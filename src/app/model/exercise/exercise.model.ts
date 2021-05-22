import { User } from "../user/user.model";
import { Video } from "../video.model";
import { Image } from "../image.model";
import { Tag } from "../tag.model";

export class Exercise {
    id: number;
    title: string;
    description: string;
    material: string;
    creator: User;
    video: Video;
    images: Image[];
    tags: Tag[];
}