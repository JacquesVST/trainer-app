import { Usuario } from './usuario.model';
import { Imagem } from './imagem.model';

export class Instrutor {
    public dataNascimento: string;
    public emailContato: string;
    public id: number;
    public imagem: Imagem = new Imagem();
    public linkUsuario: string;
    public numeroContato: string;
    public usuario: Usuario = new Usuario();
}
