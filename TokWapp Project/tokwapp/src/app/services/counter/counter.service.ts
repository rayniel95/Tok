import { Injectable } from '@angular/core';
import { CommunicatorService } from '../communicator/communicator.service';
import {LogingInfoService} from '../loging-info/loging-info.service'


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
