import { Literals} from 'src/app/util/literal-util';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  public literals = Literals.getLiterals();
  public possibleColors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'];

  constructor(private toastController: ToastController) { }

  public success(message: string): void {
    const finalMessage = this.literals.success_messages[message] ? this.literals.success_messages[message] : message;
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

  public custom(message: string, duration: number = 2000, color: string = 'light', header?: string): void {
    this.toastController
      .create({
        header,
        message,
        duration,
        position: 'top',
        color
      })
      .then((toast) => {
        toast.present();
      });
  }
}
