import { Training } from "./training.model";
import { User } from "./user/user.model";
import { UserLibrary } from "./user/userLibrary.model";

export class Session {
    id: number;
    duration: number;
    start: Date;
    end: Date;
    observations: string;
    userLibrary: UserLibrary;
}