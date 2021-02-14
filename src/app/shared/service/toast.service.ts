import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) { }

  public success(message: string): void {
    this.toastController
      .create({
        message: message,
        duration: 2000,
        position: 'top',
        color: 'success'
      })
      .then((toast) => {
        toast.present();
      });
  }

  public error(message: string): void {
    this.toastController
      .create({
        message: message,
        duration: 2000,
        position: 'top',
        color: 'danger'
      })
      .then((toast) => {
        toast.present();
      });
  }
}
