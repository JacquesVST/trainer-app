import { Literals } from 'src/app/util/literal-util';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private literals = Literals.getLiterals();

    constructor(private toastController: ToastController) {}

    public success(message: string): void {
        const finalMessage = this.literals.success_messages[message]
            ? this.literals.success_messages[message]
            : message;
        this.toastController
            .create({
                message: finalMessage,
                duration: 2000,
                position: 'top',
                color: 'success'
            })
            .then((toast) => {
                toast.present();
            });
    }

    public error(message: string): void {
        const finalMessage = this.literals.error_messages[message] ? this.literals.error_messages[message] : message;
        this.toastController
            .create({
                message: finalMessage,
                duration: 2000,
                position: 'top',
                color: 'danger'
            })
            .then((toast) => {
                toast.present();
            });
    }

    public custom(options: ToastOptions): void {
        options.duration = options.duration | 2000;
        options.position = options.position ? options.position : 'top';

        this.toastController.create(options).then((toast) => {
            toast.present();
        });
    }
}
