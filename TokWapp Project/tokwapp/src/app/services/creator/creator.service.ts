import { Injectable } from '@angular/core';
import { CommunicatorService } from '../communicator/communicator.service';
import { LogingInfoService } from '../loging-info/loging-info.service';

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
