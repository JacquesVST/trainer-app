import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MediaFile } from 'src/app/model/media-file.model';
import { User } from 'src/app/model/user/user.model';
import { FileService } from 'src/app/service/file.service';
import { Literals } from 'src/app/util/literal-util';
import { UserUtil } from 'src/app/util/user-util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public literals: any = Literals.getLiterals();
  public user: User;
  public loading: boolean;

  constructor(
    private router: Router,
    private fileService: FileService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.user = UserUtil.getUser();
    if (this.user?.picture?.id && !this.user.picture.data) {
      this.getUserPicture();
    }
  }

  public getUserPicture() {
    this.loading = true;
    this.fileService.findById(this.user.picture.id).subscribe(
      (response: MediaFile) => {
        this.user.picture = response;
      }, (error) => {
        console.error(error);
      }, () => {
        this.loading = false;
      });
  }

  public getImage(media: MediaFile): SafeResourceUrl {
    let mediaData: string = 'data:image/';
    mediaData += media.type;
    mediaData += ';base64, ';
    mediaData += media.data;
    return this.domSanitizer.bypassSecurityTrustUrl(mediaData);
  }

  public redirect(url: string): void {
    this.router.navigate([url]);
  }

  public logout(): void {
    this.router.navigateByUrl('/login');
    UserUtil.unsetUser();
  }

}
