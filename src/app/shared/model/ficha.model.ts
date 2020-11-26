import { Aluno } from './aluno.model';

export class Ficha {
    public aluno: Aluno = new Aluno();
    public data: string;
    public detalhes: string;
    public id: number;
}
