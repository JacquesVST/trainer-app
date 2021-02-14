import { Exercise } from "./exercise.model";
import { Training } from "./training.model";

export interface Activity {
    id: number;
    duration: number;
    repeats: number;
    sets: number
    comments: string;
    order: number;
    exercise: Exercise;
    training: Training;
}