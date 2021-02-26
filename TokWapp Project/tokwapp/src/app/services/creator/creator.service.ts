import { Injectable } from '@angular/core';
import { CommunicatorService } from '../communicator/communicator.service';
import { LogingInfoService } from '../loging-info/loging-info.service';


/**
 * Un servicio que tiene por objetivo crear las wallets, para ello realiza un
 * wrapper alrededor del servicio de comunicacion y utiliza la informacion
 * almacenada del usuario.
 */
@Injectable({
  providedIn: 'root'
})
export class CreatorService {

  constructor(
    private userInfo: LogingInfoService, 
    private communicator: CommunicatorService
  ) { }
  createWallet(){
    return this.communicator.createWallet(
      this.userInfo.user.getUserName(), this.userInfo.user.getPassword())
  }
}
