import { Aluno } from './aluno.model';
import { Aula } from './aula.model';

export class Sessao {
    public aluno: Aluno = new Aluno();
    public aula: Aula = new Aula();
    public fim: string;
    public id: number;
    public inicio: string;
    public observacoes: string;
}
