import { Image } from "../image.model";

export interface User {
    id: number;
    username: string;
    pass: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birth: Date;
    type: string;
    active: boolean;
    picture: Image;
}
