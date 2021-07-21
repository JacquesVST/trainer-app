import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SanitizedMediaFile } from 'src/app/model/media-file/sanitized-media-file.model';
import { User } from 'src/app/model/user/user.model';
import { LoadingService } from 'src/app/service/loading.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';
import { ImageService } from './../../../service/image.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public literals: any = Literals.getLiterals();
    public user: User;
    public profilePicture: SanitizedMediaFile;

    constructor(private router: Router, private imageService: ImageService, private loadingService: LoadingService) {}

    ngOnInit() {
        this.user = UserUtil.getUser();
        this.getImage();
    }

    public async getImage(refresh?) {
        await this.loadingService.show();
        if (this.user?.picture?.id) {
            this.profilePicture = await this.imageService.getSanitizedImage(this.user?.picture?.id);
        } else {
            this.profilePicture = {
                sanitized: this.imageService.getDefaultImage(),
                original: null
            };
        }
        if (refresh) {
            setTimeout(() => refresh.target.complete(), 0);
        } else {
            this.loadingService.hide();
        }
    }

    public redirect(url: string): void {
        this.router.navigate([url]);
    }

    public logout(): void {
        this.router.navigateByUrl('/login');
        UserUtil.unsetUser();
    }

    public doRefresh(event) {
        this.getImage(event);
    }
}
