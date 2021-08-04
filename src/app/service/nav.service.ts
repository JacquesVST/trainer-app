import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NavService {
    constructor(private navController: NavController) {}

    public goTo(url: string, param: any): void {
        param ? this.navController.navigateForward([url, param]) : this.navController.navigateForward([url]);
    }

    public goBack(): void {
        this.navController.back();
    }

    public goHome(): void {
        this.navController.navigateRoot('/dashboard');
    }

    public exit(): void {
        this.navController.navigateRoot('/login');
    }
}
