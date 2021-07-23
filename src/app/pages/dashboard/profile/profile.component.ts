import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MediaFile } from 'src/app/model/media-file/media-file.model';
import { User } from 'src/app/model/user/user.model';
import { ImageService } from 'src/app/service/image.service';
import { LoadingService } from 'src/app/service/loading.service';
import { NavService } from 'src/app/service/nav.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';
import { ExerciseListComponent } from '../../exercise/exercise-list/exercise-list.component';
import { TagComponent } from '../../tag/tag/tag.component';
import { TrainingListComponent } from '../../training/training-list/training-list.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public user: User;
    public components: any;

    constructor(
        private imageService: ImageService,
        private loadingService: LoadingService,
        private navService: NavService
    ) {
        this.components = {
            training: TrainingListComponent,
            exercise: ExerciseListComponent,
            tag: TagComponent
        };
    }

    ngOnInit() {
        this.user = UserUtil.getUser();
        this.getImage();
    }

    public async getImage(refresh?) {
        if (!refresh) {
            await this.loadingService.show();
        }
        this.user.picture = await this.imageService.getSanitizedOrDefault(this.user?.picture);
        if (refresh) {
            setTimeout(() => refresh.target.complete(), 0);
        } else {
            this.loadingService.hide();
        }
    }

    public goTo(url, param?): void {
        this.navService.goTo(url, param);
    }

    public logout(): void {
        UserUtil.unsetUser();
        this.navService.exit();
    }

    public doRefresh(event) {
        this.getImage(event);
    }
}
