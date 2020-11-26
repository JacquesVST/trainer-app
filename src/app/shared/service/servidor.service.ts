import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServidorService {

  public urlServidor = 'http://192.168.15.14:8080/';

  constructor() { }

  public getServidor(): string {
    return this.urlServidor;
  }

}
