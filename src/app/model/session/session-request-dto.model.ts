export class SessionRequestDTO {
    id: number;
    duration: number;
    start: Date;
    finish: Date;
    observations: string;
    userLibraryId: number;
    sent: boolean;
}
