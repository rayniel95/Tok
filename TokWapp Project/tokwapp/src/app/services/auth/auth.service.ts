import { Injectable } from '@angular/core';
import {CommunicatorService} from 'src/app/services/communicator/communicator.service'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private communicator: CommunicatorService) { }

  authenticateUser(userName: string, password: string): Observable<boolean> {
    return this.communicator.walletCount(userName, password).pipe(
      map(num => {
        if(num >= 0){return true}
        return false
      })
    )
  }
}
