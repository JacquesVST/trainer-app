import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { ServidorService } from 'src/app/shared/service/servidor.service';
import { AtividadeForm } from '../model/atividade-form.model';

@Injectable({
    providedIn: 'root'
})

export class CadastroAtividadeService {

    private url: string = this.servidorService.getServidor() + 'atividade';

    constructor(
        private http: HttpClient,
        private servidorService: ServidorService) { }

    public cadastrarAtividade(atividadeForm: AtividadeForm): Observable<any> {
        return this.http.post<any>(this.url, atividadeForm);
    }


}
