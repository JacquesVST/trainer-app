import { Image } from "./image.model";
import { User } from "./user.model";

export interface Training {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: number;
    published: Date;
    creator: User;
    cover: Image;
}