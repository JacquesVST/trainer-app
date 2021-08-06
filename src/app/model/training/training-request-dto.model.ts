export class TrainingRequestDTO {
    id: number;
    title: string;
    description: string;
    price: number;
    duration: number;
    published: boolean;
    creatorId: number;
    pictureId: number;
    tagIds: number[];
    code: string;
}
