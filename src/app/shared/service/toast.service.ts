import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) { }

  public sucesso(mensagem: string): void {
    this.toastController
      .create({
        message: mensagem,
        duration: 2000,
        position: 'top',
        color: 'success'
      })
      .then((toast) => {
        toast.present();
      });
  }

  public erro(mensagem: string): void {
    this.toastController
      .create({
        message: mensagem,
        duration: 2000,
        position: 'top',
        color: 'danger'
      })
      .then((toast) => {
        toast.present();
      });
  }
}
