import { Component, OnInit } from '@angular/core';
import { getLiterals } from 'src/app/util/literal-util';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {

  public literals: any = getLiterals();
  
  constructor() { }

  ngOnInit() { }

}
