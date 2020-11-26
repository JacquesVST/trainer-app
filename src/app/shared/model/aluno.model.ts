import { Usuario } from './usuario.model';
import { Imagem } from './imagem.model';

export class Aluno {
    public dataNascimento: string;
    public id: number;
    public imagem: Imagem = new Imagem();
    public linkUsuario: string;
    public numeroContato: string;
    public usuario: Usuario = new Usuario();
}
