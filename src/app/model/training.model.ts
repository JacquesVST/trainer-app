import { Image } from "./image.model";
import { User } from "./user/user.model";
import { Tag } from "./tag.model";
export class Training {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: number;
    published: Date;
    creator: User;
    cover: Image;
    tags: Tag[]
}