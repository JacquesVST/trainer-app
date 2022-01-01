import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastButton, ToastOptions } from '@ionic/core';
import { LoadingService } from 'src/app/service/loading.service';
import { Literals } from 'src/app/util/literal-util';
import { environment } from 'src/environments/environment';

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

    constructor(private toastController: ToastController, private loadingService: LoadingService) {}

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

    public error(message: string, error?, dismiss: boolean = true): void {
        let finalMessage = this.literals.error_messages[message] ? this.literals.error_messages[message] : message;
        finalMessage = error.status === 0 ? this.literals.error_messages.no_connection + ' (' + environment.API_URL + ')': finalMessage;
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
                this.loadingService.hideAll();
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
