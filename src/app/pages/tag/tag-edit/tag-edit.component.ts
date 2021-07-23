import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tag } from 'src/app/model/tag.model';
import { LoadingService } from 'src/app/service/loading.service';
import { TagService } from 'src/app/service/tag.service';
import { ToastService } from 'src/app/service/toast.service';
import { Literals } from 'src/app/util/literal-util';

@Component({
    selector: 'app-tag-edit',
    templateUrl: './tag-edit.component.html',
    styleUrls: ['./tag-edit.component.scss']
})
export class TagEditComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public newTag: Tag = new Tag();

    constructor(
        private modalController: ModalController,
        private toastService: ToastService,
        private tagService: TagService,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {}

    public dismiss() {
        this.modalController.dismiss(this.newTag);
    }

    public async persistTag() {
        await this.loadingService.show();
        console.log(this.newTag);
        this.tagService.persistTag(this.newTag).subscribe(
            (response: Tag) => {
                this.newTag = response;
                this.toastService.success('item_saved');
                this.dismiss();
            },
            (error) => {
                console.error(error);
                this.toastService.error('processing_request');
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public openColorPicker() {
        const element = document.getElementById('color-input');
        element.click();
    }
}
