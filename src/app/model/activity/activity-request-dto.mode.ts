export class ActivityRequestDTO {
    id: number;
    duration: number = 0;
    repeats: number = 0;
    sets: number = 0;
    comments: string;
    sequentialOrder: number;
    exerciseId: number;
    trainingId: number;
}