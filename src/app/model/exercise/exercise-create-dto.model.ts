
export class ExerciseCreateDTO {
    title: string;
    description: string;
    material: string;
    creatorId: number;
    videoId: number;
    imageIds: number[];
    tagIds: number[];
}