import { Session } from "protractor";
import { MediaFile } from "../media-file/media-file.model";
import { User } from "../user/user.model";

export class Comment {
    id: number;
    text: string;
    posted: Date;
    deleted: boolean;
    author: User;
    session: Session;
    media: MediaFile;
}