export class ExerciseRequestDTO {
    id: number;
    title: string;
    description: string;
    material: string;
    creatorId: number;
    fileIds: number[];
    tagIds: number[];
}