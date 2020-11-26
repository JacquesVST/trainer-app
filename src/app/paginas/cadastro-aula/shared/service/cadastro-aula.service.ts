import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { ServidorService } from 'src/app/shared/service/servidor.service';
import { AulaForm } from '../model/aula-form.model';

@Injectable({
    providedIn: 'root'
})

export class CadastroAulaService {

    private url: string = this.servidorService.getServidor() + 'aula';

    constructor(
        private http: HttpClient,
        private servidorService: ServidorService) { }

    public cadastrarAula(aulaForm: AulaForm): Observable<any> {
        return this.http.post<any>(this.url, aulaForm);
    }


}
