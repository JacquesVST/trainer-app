import { Exercise } from "./exercise.model";
import { Training } from "./training.model";

export class Activity {
    id: number;
    duration: number;
    repeats: number;
    sets: number
    comments: string;
    sequentialOrder: number;
    exercise: Exercise;
    training: Training;
}