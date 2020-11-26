import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { ServidorService } from 'src/app/shared/service/servidor.service';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

    private url: string = this.servidorService.getServidor() + 'usuario';

    constructor(
        private http: HttpClient,
        private servidorService: ServidorService) { }

    public listarUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.url);
    }

    public buscarUsuario(idUsuario: number): Observable<Usuario> {
        return this.http.get<Usuario>(this.url + '/' + idUsuario);
    }

}
