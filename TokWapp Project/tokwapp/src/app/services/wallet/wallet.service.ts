import { Injectable } from '@angular/core';
import {CommunicatorService} from 'src/app/services/communicator/communicator.service'
import { LogingInfoService } from '../loging-info/loging-info.service';
import {Observable} from 'rxjs'


// TODO - it must not be in the root
@Injectable({
  providedIn: 'root' 
})
export class WalletService {

  constructor(private communicator: CommunicatorService, 
    private userInfo: LogingInfoService) { }

  verSaldo(): Observable<number> {
    return this.communicator.verSaldo(this.userInfo.getUser().getUserName(),
      this.userInfo.getUser().getPassword())
  }
  addCrypto(crypto: number): Observable<boolean>{
    return this.communicator.addCrypto(this.userInfo.getUser().getUserName(),
      this.userInfo.getUser().getPassword(), crypto)  
  }
}
