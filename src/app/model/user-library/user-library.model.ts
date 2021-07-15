import { Training } from "../training/training.model";
import { User } from "../user/user.model";

export interface UserLibrary {
    id: number;
    endUser: User;
    training: Training;
    obtained: Date;
    favorite: boolean;
}