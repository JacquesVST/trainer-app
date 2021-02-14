import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  private urlServer = environment.API_URL;

  constructor() { }

  public getServer(): string {
    return this.urlServer;
  }

}
