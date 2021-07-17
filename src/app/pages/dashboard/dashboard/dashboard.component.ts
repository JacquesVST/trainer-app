import { Literals } from 'src/app/util/literal-util';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public literals: any = Literals.getLiterals();

    constructor() {}

    ngOnInit() {}
}
