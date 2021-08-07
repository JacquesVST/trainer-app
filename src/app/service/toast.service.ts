import { Literals } from 'src/app/util/literal-util';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions, ToastButton } from '@ionic/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private literals = Literals.getLiterals();
    private dismissButton: ToastButton = {
        icon: 'close',
        side: 'end',
        role: 'cancel'
    };

    constructor(private toastController: ToastController) {}

    public success(message: string, dismiss: boolean = true): void {
        const finalMessage = this.literals.success_messages[message]
            ? this.literals.success_messages[message]
            : message;
        this.toastController
            .create({
                message: finalMessage,
                duration: 2000,
                position: 'top',
                color: 'success',
                buttons: dismiss ? [this.dismissButton] : []
            })
            .then((toast) => {
                toast.present();
            });
    }

    public error(message: string, dismiss: boolean = true): void {
        const finalMessage = this.literals.error_messages[message] ? this.literals.error_messages[message] : message;
        this.toastController
            .create({
                message: finalMessage,
                duration: 2000,
                position: 'top',
                color: 'danger',
                buttons: dismiss ? [this.dismissButton] : []
            })
            .then((toast) => {
                toast.present();
            });
    }

    public custom(options: ToastOptions): void {
        options.duration = options.duration | 2000;
        options.position = options.position ? options.position : 'top';
        options.buttons = options.buttons ? options.buttons : [this.dismissButton];
        this.toastController.create(options).then((toast) => {
            toast.present();
        });
    }
}
