import { Training } from "./training.model";
import { User } from "./user/user.model";

export interface Session {
    id: number;
    duration: number;
    start: Date;
    end: Date;
    observations: string;
    training: Training;
    user: User;
}