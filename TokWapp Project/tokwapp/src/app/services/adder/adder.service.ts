import { Injectable } from '@angular/core';
import {CommunicatorService} from 'src/app/services/communicator/communicator.service'
import { LogingInfoService } from '../loging-info/loging-info.service';
import {Observable} from 'rxjs'

/**
 * Un servicio simple que sirve como wrapper para el servicio de comunicacion.
 * Usa el servicio de comunicacion y el servicio LogingInfoService (donde se
 * almacena la informacion del usuario autenticado) para realizar los pedidos
 * para anadir monedas a una billetera. Devuelve el mismo observable que el 
 * servicio de comunicacion.
 */
@Injectable({
  providedIn: 'root'
})
export class AdderService {

  constructor(private userInfo: LogingInfoService, 
    private communicator: CommunicatorService) { 
  }

  addFounds(wallet: number, crypto: number): Observable<boolean>{
    return this.communicator.addCrypto(this.userInfo.getUser().getUserName(),
      this.userInfo.getUser().getPassword(), wallet, crypto)  
  }

}
