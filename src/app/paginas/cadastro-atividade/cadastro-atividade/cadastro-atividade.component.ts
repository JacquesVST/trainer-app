import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/model/tag.model';
import { TagService } from 'src/app/shared/service/tag.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { AtividadeForm } from '../shared/model/atividade-form.model';
import { CadastroAtividadeService } from '../shared/service/cadastro-atividade.service';

@Component({
  selector: 'app-cadastro-atividade',
  templateUrl: './cadastro-atividade.component.html',
  styleUrls: ['./cadastro-atividade.component.scss'],
})
export class CadastroAtividadeComponent implements OnInit {

  @Input() public idAtividade: number;
  @Input() public idInstrutor = 1;
  public idVideo = 1;
  public atividade: AtividadeForm = new AtividadeForm();
  public tags: Tag[] = [];
  public tagsSelecionadas: Tag[] = [];
  public spinnerRequest: boolean;
  public spinnerTags: boolean;

  constructor(
    private cadastroAtividadeService: CadastroAtividadeService,
    private tagService: TagService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.listarTags();
  }

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
    this.atividade.tags = this.tagsSelecionadas;
  }

  public listarTags(): void {
    this.spinnerTags = true;
    this.tags = [];
    this.tagService.listarTags().subscribe(
      (tags: Tag[]) => {
        this.tags = tags;
      }, (err) => {
        this.toastService.erro('Erro ao buscar tags!');
        console.log(err);
      }, () => {
        this.spinnerTags = false;
      }
    );
  }

}
