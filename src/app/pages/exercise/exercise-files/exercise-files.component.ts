import { ImageService } from 'src/app/service/image.service';
import { Component, Input, OnInit } from '@angular/core';
import { MediaFile } from 'src/app/model/media-file/media-file.model';

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
    public files: MediaFile[];
    public slideOptions: any;

    constructor(private imageService: ImageService) {}

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
}
