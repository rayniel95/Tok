import { Injectable } from '@angular/core';
import {CommunicatorService} from 'src/app/services/communicator/communicator.service'
import {url} from 'src/app/config'
import { LogingInfoService } from '../loging-info/loging-info.service';
import {Crypto} from 'src/app/models/crypto/crypto'

// TODO - it must not be in the root
@Injectable({
  providedIn: 'root' 
})
export class WalletService {

  constructor(private communicator: CommunicatorService, 
    private userInfo: LogingInfoService) { }

  verSaldo(): number {
    return this.communicator.verSaldo(this.userInfo.getUser().getUserName(),
      this.userInfo.getUser().getPassword())
  }
  addCrypto(crypto: number): boolean{
    return this.communicator.addCrypto(this.userInfo.getUser().getUserName(),
      this.userInfo.getUser().getPassword(), crypto)  
  }
}
// NOTE - no me queda claro pq no se usa async