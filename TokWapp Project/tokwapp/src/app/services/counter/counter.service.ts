import { Injectable } from '@angular/core';
import { CommunicatorService } from '../communicator/communicator.service';
import {LogingInfoService} from '../loging-info/loging-info.service'


/**
 * Un servicio que funciona como un wrapper sobre el servicio de comunicacion.
 * Para realizar el request al endpoint de la cantidad de wallets utiliza la
 * informacion del usuario que se encuentra en el LogingInfoService.
 */
@Injectable({
  providedIn: 'root'
})
export class CounterService {

  constructor(
    private userInfo: LogingInfoService, 
    private communicator: CommunicatorService
  ) { }

  countWallets(){
    return this.communicator.walletCount(
      this.userInfo.getUser().getUserName(), this.userInfo.getUser().getPassword()
    )
  }

}
