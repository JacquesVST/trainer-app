import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/model/tag.model';
import { ToastService } from 'src/app/shared/service/toast.service';
import { TagService } from '../shared/service/tag.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.scss'],
})
export class ExplorarComponent implements OnInit {

  public tags: Tag[] = [];
  public spinnerRequest: boolean;

  constructor(
    private tagService: TagService,
    private toastService: ToastService
    ) { }

  ngOnInit(){
    this.listarTags();
  }

  public listarTags(): void{
    this.tagService.listarTags().subscribe(
      (tags: Tag[]) => {
        this.tags = tags;
      }, (err) => {
        console.log(err);
        this.toastService.erro('Erro ao buscar tags!');
      }
    );
  }

}
