import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tag } from 'src/app/model/tag.model';
import { TagService } from 'src/app/service/tag.service';
import { ToastService } from 'src/app/service/toast.service';
import { TagEditComponent } from '../tag-edit/tag-edit.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {

  public tags: Tag[] = []
  public loading: boolean = false;

  constructor(
    private tagService: TagService,
    private toastService: ToastService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getAllTags();
  }

  public getAllTags() {
    this.loading = true;
    this.tagService.findAll().subscribe(
      (tags: Tag[]) => {
        this.tags = tags
      }, (error) => {
        console.error(error);
        this.toastService.error('Error while retrieving tags!');
      }, () => {
        this.loading = false;
      });
  }

  public async newTag() {
    const modal = await this.modalController.create({
      component: TagEditComponent
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data?.data?.id) {
          this.tags.push(data.data);
        }
      });

    return await modal.present();
  }

}
