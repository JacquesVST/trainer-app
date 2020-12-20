import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { ToastService } from 'src/app/shared/service/toast.service';
import { UsuarioService } from '../shared/service/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  public usuarioSelecionado: Usuario = new Usuario();
  public usuarios: Usuario[] = [];
  public spinnerRequest: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(){
    this.listarUsuarios();
    this.buscarUsuario(1);
  }

  public listarUsuarios(): void{
    this.spinnerRequest = true;
    this.usuarioService.listarUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.spinnerRequest = false;
      }, (err) => {
        this.spinnerRequest = false;
        this.toastService.erro('Erro ao listar usuários!');
        console.log(err);
      }
    );
  }

  public buscarUsuario(idUsuario: number): void {
    this.spinnerRequest = true;
    this.usuarioService.buscarUsuario(idUsuario).subscribe(
      (usuario: Usuario) => {
        this.usuarioSelecionado = usuario;
        this.spinnerRequest = false;
      }, (err) => {
        this.spinnerRequest = false;
        this.toastService.erro('Erro ao buscar usuários!');
        console.log(err);
      }
    );
  }

  public navegar(url: string): void{
    this.router.navigate([url]);
  }

  public testar(x: any){
    console.log(x);
  }

}
