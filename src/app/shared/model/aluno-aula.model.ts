import { Aluno } from './aluno.model';
import { Aula } from './aula.model';

export class AlunoAula {
    public aluno: Aluno = new Aluno();
    public aula: Aula = new Aula();
    public dataAquisicao: string;
    public disponivel: boolean;
    public id: number;
}
