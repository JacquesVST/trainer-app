import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atividade } from 'src/app/shared/model/atividade.model';
import { Aula } from 'src/app/shared/model/aula.model';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { ServidorService } from 'src/app/shared/service/servidor.service';
import { SequenciaForm } from '../model/sequencia-form.model';

@Injectable({
    providedIn: 'root'
})

export class CadastroSequenciaService {

    private url: string = this.servidorService.getServidor();

    constructor(
        private http: HttpClient,
        private servidorService: ServidorService) { }

    public cadastrarSequencia(sequenciaForm: SequenciaForm): Observable<any> {
        return this.http.post<any>(this.url + '/sequencia', sequenciaForm);
    }

    public listarAtividadesPorInstrutor(idInstrutor: number): Observable<Atividade[]> {
        return this.http.get<Atividade[]>(this.url + '/atividade/instrutor/' + idInstrutor);
    }

    public buscarAulaPorId(idAula: number): Observable<Aula> {
        return this.http.get<Aula>(this.url + '/aula/' + idAula);
    }

}
