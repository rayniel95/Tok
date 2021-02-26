import { Injectable } from '@angular/core';
import {CommunicatorService} from 'src/app/services/communicator/communicator.service'
import { LogingInfoService } from '../loging-info/loging-info.service';
import {Observable} from 'rxjs'


/**
 * Un servicio que tiene por objetivo consultar la cantidad de fondos en una
 * wallet determinada. Para ello utiliza la informacion del usuario almacenada
 * en el servicio de LigingInfoService y los metodos del servicio de 
 * comunicacion.
 */
@Injectable({
  providedIn: 'root' // NOTE - no debe estar en el root
})
export class ConsulterService {

  constructor(private communicator: CommunicatorService, 
    private userInfo: LogingInfoService) { }

  consultFounds(wallet: number): Observable<number> {
    return this.communicator.verSaldo(this.userInfo.getUser().getUserName(),
      this.userInfo.getUser().getPassword(), wallet)
  }
}
