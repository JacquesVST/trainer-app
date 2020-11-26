import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/service/toast.service';
import { AulaForm } from '../shared/model/aula-form.model';
import { CadastroAulaService } from '../shared/service/cadastro-aula.service';

@Component({
  selector: 'app-cadastro-aula',
  templateUrl: './cadastro-aula.component.html',
  styleUrls: ['./cadastro-aula.component.scss'],
})
export class CadastroAulaComponent {

  @Input() public idAula: number;
  @Input() public idInstrutor = 1;
  public idImagem = 1;
  public aula: AulaForm = new AulaForm();
  public spinnerRequest: boolean;

  constructor(
    private cadastroAulaService: CadastroAulaService,
    private toastService: ToastService
  ) { }

  public cadastrarAula(): void {
    this.spinnerRequest = true;
    this.cadastroAulaService.cadastrarAula(this.aula)
      .subscribe(() => {
        this.toastService.sucesso('Aula cadastrada com sucesso!');
      }, (err) => {
        this.toastService.erro('Aula não pode ser cadastrada!');
        console.log(err);
      }, () => {
        this.spinnerRequest = false;
      });
  }

  public salvarAula(): void {
    this.prepararForm();
    if (this.idAula) {

    } else {
      this.cadastrarAula();
    }
  }

  public prepararForm(): void{
    this.aula.idInstrutor = this.idInstrutor;
    this.aula.idImagem = this.idImagem;
  }

}
