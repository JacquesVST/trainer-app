import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tag } from 'src/app/model/tag.model';
import { TagService } from 'src/app/service/tag.service';
import { ToastService } from 'src/app/service/toast.service';
import { getLiterals } from 'src/app/util/literal-util';

@Component({
  selector: 'app-tag-selection',
  templateUrl: './tag-selection.component.html',
  styleUrls: ['./tag-selection.component.scss'],
})
export class TagSelectionComponent implements OnInit {

  @Input() selectedTags: Tag[];
  public availableTags: Tag[] = [];
  public loading: boolean;
  public literals: any = getLiterals();

  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private tagService: TagService
  ) { }

  async ngOnInit() {
    await this.getAllTags();
  }

  public dismiss() {
    this.modalController.dismiss(this.selectedTags);
  }

  public async getAllTags() {
    this.loading = true;
    this.tagService.findAll().subscribe(
      (tags: Tag[]) => {
        if (this.selectedTags) {
          const selectedIds = this.selectedTags.map(tag => tag.id);
          this.availableTags = tags.filter(tag => !selectedIds.includes(tag.id));
        } else {
          this.selectedTags = [];
          this.availableTags = tags;
        }

      }, (error) => {
        console.error(error);
        this.toastService.error('retrieving_items');
      }, () => {
        this.loading = false;
      });
  }

  public add(tag: Tag) {
    this.selectedTags.push(tag);
    this.availableTags = this.availableTags.filter(t => t.id != tag.id);
  }

  public remove(tag: Tag) {
    this.availableTags.push(tag);
    this.selectedTags = this.selectedTags.filter(t => t.id != tag.id);
  }

}
