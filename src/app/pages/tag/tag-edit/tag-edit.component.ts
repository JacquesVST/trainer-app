import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tag } from 'src/app/model/tag.model';
import { TagService } from 'src/app/service/tag.service';
import { ToastService } from 'src/app/service/toast.service';
import { getLiterals } from 'src/app/util/literal-util';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss'],
})
export class TagEditComponent implements OnInit {

  public literals: any = getLiterals();
  public newTag: Tag = new Tag();
  public loading: boolean;

  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private tagService: TagService
  ) { }

  ngOnInit() { }

  public dismiss() {
    this.modalController.dismiss(this.newTag);
  }

  public persistTag() {
    this.loading = true;
    console.log(this.newTag)
    this.tagService.persistTag(this.newTag).subscribe(
      (response: Tag) => {
        this.newTag = response;
        this.toastService.success('item_saved');
        this.dismiss();
      },
      (error) => {
        console.error(error)
        this.toastService.error('processing_request');
      },
      () => {
        this.loading = false;
      }
    );
  }

  public openColorPicker() {
    const element = document.getElementById('color-input');
    element.click();
  }

}
