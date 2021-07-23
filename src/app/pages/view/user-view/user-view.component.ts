import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/model/user/user.model';
import { ImageService } from 'src/app/service/image.service';
import { Literals } from 'src/app/util/literal-util';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
    @Input() user: User;
    public literals: any = Literals.getLiterals();

    constructor(private modalController: ModalController, private imageService: ImageService) {}

    async ngOnInit() {
        //this.user.picture = await this.imageService.getSanitizedOrDefault(this.user?.picture);
    }

    public dismiss() {
        this.modalController.dismiss();
    }
}
