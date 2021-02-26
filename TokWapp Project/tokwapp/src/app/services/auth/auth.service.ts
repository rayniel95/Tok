import { Injectable } from '@angular/core';
import {CommunicatorService} from 'src/app/services/communicator/communicator.service'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'

/**
 * Un servicio simple que se utiliza para saber si el usuario se encuentra 
 * registrado en la base de datos. Para ello basta hacer un request al endpoint
 * de la cantidad de wallets, si la request es efectiva el usuario se encuentra
 * en el sistema.
 */
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
