import { Training } from "./training.model";
import { User } from "./user.model";

export interface UserLibrary {
    id: number;
    endUser: User;
    training: Training;
    obtained: Date;
    favorite: boolean;
}