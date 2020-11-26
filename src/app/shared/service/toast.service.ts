import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class ToastService {

  constructor(private toastController: ToastController) { }

  async sucesso(mensagem: string){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  async erro(mensagem: string){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'top',
      color: 'error'
    });
    toast.present();
  }

}
