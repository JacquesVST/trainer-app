import { Aluno } from './aluno.model';
import { Aula } from './aula.model';

export class Avaliacao {
    public aluno: Aluno = new Aluno();
    public aula: Aula = new Aula();
    public conteudo: string;
    public dataHora: string;
    public id: number;
    public nota: number;
    public titulo: string;
}
