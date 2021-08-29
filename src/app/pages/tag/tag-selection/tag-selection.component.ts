import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tag } from 'src/app/model/tag.model';
import { LoadingService } from 'src/app/service/loading.service';
import { TagService } from 'src/app/service/tag.service';
import { ToastService } from 'src/app/service/toast.service';
import { Literals } from 'src/app/util/literal-util';

@Component({
    selector: 'app-tag-selection',
    templateUrl: './tag-selection.component.html',
    styleUrls: ['./tag-selection.component.scss']
})
export class TagSelectionComponent implements OnInit {
    @Input() selectedTags: Tag[];
    public availableTags: Tag[] = [];
    public initialTags: Tag[];
    public literals: any = Literals.getLiterals();

    constructor(
        private modalController: ModalController,
        private toastService: ToastService,
        private tagService: TagService,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.initialTags = this.selectedTags ? this.selectedTags : [];
        this.getAllTags();
    }

    public dismiss(save: boolean) {
        this.modalController.dismiss(save ? this.selectedTags : this.initialTags);
    }

    public async getAllTags() {
        await this.loadingService.show();
        this.tagService.findAll().subscribe(
            (tags: Tag[]) => {
                if (this.selectedTags) {
                    const selectedIds = this.selectedTags.map((tag) => tag.id);
                    this.availableTags = tags.filter((tag) => !selectedIds.includes(tag.id));
                } else {
                    this.selectedTags = [];
                    this.availableTags = tags;
                }
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items', error);
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public add(tag: Tag) {
        this.selectedTags.push(tag);
        this.availableTags = this.availableTags.filter((t) => t.id != tag.id);
    }

    public remove(tag: Tag) {
        this.availableTags.push(tag);
        this.selectedTags = this.selectedTags.filter((t) => t.id != tag.id);
    }
}
