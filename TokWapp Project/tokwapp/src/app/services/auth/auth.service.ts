import { Injectable } from '@angular/core';
import {CommunicatorService} from 'src/app/services/communicator/communicator.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private communicator: CommunicatorService) { }

  authenticateUser(userName: string, password: string): boolean {
    if(this.communicator.verSaldo(userName, password) >= 0){
      return true
    }
    return false
  }
}
