import { Exercise } from "./exercise/exercise.model";
import { Training } from "./training.model";

export class Activity {
    id: number;
    duration: number;
    repeats: number;
    sets: number
    comments: string;
    order: number;
    exercise: Exercise;
    training: Training;
}