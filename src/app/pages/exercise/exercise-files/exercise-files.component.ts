import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MediaFile } from 'src/app/model/media-file/media-file.model';
import { ImageService } from 'src/app/service/image.service';
import { Literals } from 'src/app/util/literal-util';

@Component({
    selector: 'app-exercise-files',
    templateUrl: './exercise-files.component.html',
    styleUrls: ['./exercise-files.component.scss']
})
export class ExerciseFilesComponent implements OnInit {
    @Input()
    public set fileList(files: MediaFile[]) {
        this.files = this.sanitizeImages(files);
    }
    @Input() public allowEdit: boolean;
    public literals: any = Literals.getLiterals();
    public files: MediaFile[];
    public slideOptions: any;

    constructor(private imageService: ImageService, private alertController: AlertController) {}

    ngOnInit() {
        this.slideOptions = {
            initialSlide: 0,
            speed: 400
        };
    }

    public sanitizeImages(files: MediaFile[]): MediaFile[] {
        for (let file of files) {
            file = this.imageService.sanitizeImage(file);
        }
        return files;
    }

    public async confirmDelete(fileId: number) {
        const confirm = await this.alertController.create({
            header: this.literals.form.confirmation,
            message: this.literals.messages.confirm_delete,
            buttons: [
                {
                    text: this.literals.common.no
                },
                {
                    text: this.literals.common.yes,
                    handler: () => {
                        this.files = this.files.filter((f) => f.id !== fileId);
                    }
                }
            ]
        });

        confirm.present();
    }
}
