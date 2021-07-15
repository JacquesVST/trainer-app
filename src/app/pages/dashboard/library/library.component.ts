import { Component, OnInit } from '@angular/core';
import { Literals} from 'src/app/util/literal-util';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {

  public literals: any = Literals.getLiterals();
  
  constructor() { }

  ngOnInit() { }

}
