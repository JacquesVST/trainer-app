import { Aluno } from './aluno.model';
import { Instrutor } from './instrutor.model';

export class Chat {
    public aluno: Aluno = new Aluno();
    public exclusaoAluno: boolean;
    public exclusaoInstrutor: boolean;
    public id: number;
    public inicio: string;
    public instrutor: Instrutor = new Instrutor();
}
