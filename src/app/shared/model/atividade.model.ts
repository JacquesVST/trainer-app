import { Instrutor } from './instrutor.model';
import { Video } from './video.model';

export class Atividade {
    public dataCadastro: string;
    public descricao: string;
    public id: number;
    public instrutor: Instrutor = new Instrutor();
    public material: string;
    public titulo: string;
    public video: Video = new Video();
}
