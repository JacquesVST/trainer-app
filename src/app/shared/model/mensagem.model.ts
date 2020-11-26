import { Chat } from './chat.model';
import { Usuario } from './usuario.model';

export class Mensagem {
    public chat: Chat = new Chat();
    public conteudo: string;
    public envio: string;
    public id: number;
    public usuario: Usuario = new Usuario();
    public visualizado: boolean;
}
