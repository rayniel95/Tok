import { Injectable } from '@angular/core';
import {CommunicatorService} from 'src/app/services/communicator/communicator.service'
import { LogingInfoService } from '../loging-info/loging-info.service';
import {Observable} from 'rxjs'


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
