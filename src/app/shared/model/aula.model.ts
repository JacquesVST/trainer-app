import { Imagem } from './imagem.model';
import { Instrutor } from './instrutor.model';

export class Aula {
    public dataCadastro: string;
    public descricao: string;
    public id: number;
    public imagem: Imagem = new Imagem();
    public instrutor: Instrutor = new Instrutor();
    public privado: boolean;
    public titulo: string;
}
