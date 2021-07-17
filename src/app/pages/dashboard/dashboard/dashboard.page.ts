import { Literals } from 'src/app/util/literal-util';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.page.html',
    styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
    public literals: any = Literals.getLiterals();

    constructor() {}

    ngOnInit() {}
}
