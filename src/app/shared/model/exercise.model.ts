import { User } from "./user/user.model";
import { Video } from "./video.model";

export interface Exercise {
    id: number;
    title: string;
    description: string;
    material: string;
    creator: User;
    video: Video;
}