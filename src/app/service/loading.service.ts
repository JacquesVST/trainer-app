import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Literals } from 'src/app/util/literal-util';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    public literals = Literals.getLiterals();
    public loadingStack: any[] = [];

    constructor(private loadingController: LoadingController) {}

    public async show() {
        const loading = await this.loadingController.create({
            message: this.literals.common.wait,
            translucent: true
        });
        this.loadingStack.push(loading);
        await loading.present();
    }

    public hide(delay: number = 100): void {
        setTimeout(() => this.loadingStack.pop().dismiss(), delay);
    }

    public hideAll() {
        setTimeout(() => {
            this.loadingStack.forEach((modal) => {
                this.hide(0);
            });
        }, 1000);
    }
}
