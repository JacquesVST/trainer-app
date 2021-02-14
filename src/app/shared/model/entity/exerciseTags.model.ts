import { Exercise } from "./exercise.model";
import { Tag } from "./tag.model";

export interface ExerciseTags {
    id: number;
    exercise: Exercise;
    tag: Tag;
}