import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { TagService } from 'src/app/service/tag.service';
import { ToastService } from 'src/app/service/toast.service';
import { TrainingService } from 'src/app/service/training.service';

@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.scss'],
})
export class TrainingEditComponent implements OnInit {

  public user: User;
  public trainingId: number;

  constructor(
    private tagService: TagService,
    private toastService: ToastService,
    private trainingService: TrainingService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }


}
