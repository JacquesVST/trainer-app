import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tag } from 'src/app/model/tag.model';
import { LoadingService } from 'src/app/service/loading.service';
import { TagService } from 'src/app/service/tag.service';
import { ToastService } from 'src/app/service/toast.service';
import { Literals } from 'src/app/util/literal-util';
import { TagEditComponent } from '../tag-edit/tag-edit.component';
import { NavService } from './../../../service/nav.service';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public tags: Tag[] = [];

    constructor(
        private tagService: TagService,
        private toastService: ToastService,
        private modalController: ModalController,
        private loadingService: LoadingService,
        private navService: NavService
    ) {}

    ngOnInit() {
        this.getAllTags();
    }

    public getAllTags() {
        this.loadingService.show();
        this.tagService.findAll().subscribe(
            (tags: Tag[]) => {
                this.tags = tags;
            },
            (error) => {
                console.error(error);
                this.toastService.error('retrieving_items');
            },
            () => {
                this.loadingService.hide();
            }
        );
    }

    public async newTag() {
        const modal = await this.modalController.create({
            component: TagEditComponent
        });

        modal.onDidDismiss().then((data) => {
            if (data?.data?.id) {
                this.tags.push(data.data);
            }
        });

        return await modal.present();
    }

    public goBack() {
        this.navService.goBack();
    }
}
