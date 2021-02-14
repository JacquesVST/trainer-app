import { Image } from "./image.model";
import { UserType } from "./userType.model";

export interface User {
    id: number;
    username: string;
    pass: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birth: Date;
    type: UserType;
    active: boolean;
    picture: Image;
}
