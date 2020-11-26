import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/service/toast.service';
import { AtividadeForm } from '../shared/model/atividade-form.model';
import { CadastroAtividadeService } from '../shared/service/cadastro-atividade.service';

@Component({
  selector: 'app-cadastro-atividade',
  templateUrl: './cadastro-atividade.component.html',
  styleUrls: ['./cadastro-atividade.component.scss'],
})
export class CadastroAtividadeComponent {

  @Input() public idAtividade: number;
  @Input() public idInstrutor = 1;
  public idVideo = 1;
  public atividade: AtividadeForm = new AtividadeForm();
  public spinnerRequest: boolean;

  constructor(
    private cadastroAtividadeService: CadastroAtividadeService,
    private toastService: ToastService
  ) { }

  public cadastrarAtividade(): void {
    this.spinnerRequest = true;
    this.cadastroAtividadeService.cadastrarAtividade(this.atividade)
      .subscribe(() => {
        this.toastService.sucesso('Atividade cadastrada com sucesso!');
      }, (err) => {
        this.toastService.erro('Atividade não pode ser cadastrada!');
        console.log(err);
      }, () => {
        this.spinnerRequest = false;
      });
  }

  public salvarAtividade(): void {
    this.prepararForm();
    if (this.idAtividade) {

    } else {
      this.cadastrarAtividade();
    }
  }

  public prepararForm(): void{
    this.atividade.idInstrutor = this.idInstrutor;
    this.atividade.idVideo = this.idVideo;
  }

}
