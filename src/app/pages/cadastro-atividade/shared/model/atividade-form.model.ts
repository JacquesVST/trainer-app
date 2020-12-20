import { Tag } from 'src/app/shared/model/tag.model';

export class AtividadeForm {
    public descricao: string;
    public idInstrutor: number;
    public material: string;
    public titulo: string;
    public idVideo: number;
    public tags: Tag[];
}
