import { Component, Input, OnInit } from '@angular/core';
import { Atividade } from 'src/app/shared/model/atividade.model';
import { Aula } from 'src/app/shared/model/aula.model';
import { Sequencia } from 'src/app/shared/model/sequencia.model';
import { ToastService } from 'src/app/shared/service/toast.service';
import { SequenciaForm } from '../shared/model/sequencia-form.model';
import { CadastroSequenciaService } from '../shared/service/cadastro-sequencia.service';

@Component({
  selector: 'app-cadastro-sequencia',
  templateUrl: './cadastro-sequencia.component.html',
  styleUrls: ['./cadastro-sequencia.component.scss'],
})
export class CadastroSequenciaComponent implements OnInit{

  @Input() public idSequencia: number;
  @Input() public idAula = 1;
  @Input() public idInstrutor = 1;
  public idAtividade = 1;
  public idImagem = 1;
  public sequencia: SequenciaForm = new SequenciaForm();
  public sequenciasProntas: Sequencia[] = [];
  public atividades: Atividade[] = [];
  public atividadeSelecionada: Atividade = new Atividade();
  public aula: Aula = new Aula();
  public spinnerInicial: boolean;
  public spinnerRequest: boolean;

  constructor(
    private cadastroSequenciaService: CadastroSequenciaService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.listarAtividadesPorInstrutor();
  }

  public cadastrarSequencia(): void {
    this.spinnerRequest = true;
    this.cadastroSequenciaService.cadastrarSequencia(this.sequencia)
      .subscribe(() => {
        this.toastService.sucesso('Sequência cadastrada com sucesso!');
      }, (err) => {
        this.toastService.erro('Sequência não pode ser cadastrada!');
        console.log(err);
      }, () => {
        this.spinnerRequest = false;
      });
  }

  public buscarAulaPorId(): void {
    this.spinnerInicial = true;
    this.cadastroSequenciaService.buscarAulaPorId(this.idAula)
      .subscribe((aula: Aula) => {
        this.aula = aula;
      }, (err) => {
        this.toastService.erro('Erro ao buscar Aula!');
        console.log(err);
      }, () => {
        this.spinnerInicial = false;
      });
  }

  public listarAtividadesPorInstrutor(): void {
    this.spinnerInicial = true;
    this.cadastroSequenciaService.listarAtividadesPorInstrutor(this.idInstrutor)
      .subscribe((atividades: Atividade[]) => {
        this.atividades = atividades;
      }, (err) => {
        this.toastService.erro('Erro ao buscar Aula!');
        console.log(err);
      }, () => {
        this.spinnerInicial = false;
      });
  }

  public salvarSequencia(): void {
    this.prepararForm();
    if (this.idSequencia) {

    } else {
      this.cadastrarSequencia();
    }
  }

  public prepararForm(): void{
    this.sequencia.idAula = this.idAula;
    this.sequencia.idAtividade = this.atividadeSelecionada.id;
  }

}
