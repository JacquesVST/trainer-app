import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/model/tag.model';
import { TagService } from 'src/app/shared/service/tag.service';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit{
  
  constructor(
    private tagService: TagService,
    private toastService: ToastService
  ) {}

  ngOnInit(){
    this.getAllTags();
  }

  public spinnerRequest: boolean;
  public tags: Tag[] = [];

  public getAllTags(): void {
    this.spinnerRequest = true;
    this.tagService.getAllTags()
    .subscribe(
      (response) => {
        this.tags = response
      }, 
      (error) => {
        console.error(error);
        this.toastService.error('Failed to fetch tags!');
      },
      () => {
        this.spinnerRequest = false;
      }
    );
  }

}
