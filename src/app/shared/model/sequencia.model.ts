import { Atividade } from './atividade.model';
import { Aula } from './aula.model';

export class Sequencia {
    public atividade: Atividade = new Atividade();
    public aula: Aula = new Aula();
    public descricao: string;
    public id: number;
    public ordem: number;
    public repeticoes: number;
    public series: number;
    public tempo: number;
}
