import { UserLibrary } from './user-library/user-library.model';

export class Session {
    id: number;
    duration: number;
    start: Date;
    finish: Date;
    observations: string;
    userLibrary: UserLibrary;
}
