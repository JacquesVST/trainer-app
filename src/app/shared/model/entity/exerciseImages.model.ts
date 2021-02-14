import { Exercise } from "./exercise.model";
import { Image } from "./image.model";

export interface ExerciseImages {
    id: number;
    exercise: Exercise;
    image: Image;
    order: number;
}