import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {url} from 'src/app/config'
import { LogingInfoService } from '../loging-info/loging-info.service';
import {Crypto} from 'src/app/models/crypto/crypto'

// TODO - it must not be in the root
@Injectable({
  providedIn: 'root' 
})
export class WalletService {

  constructor(private client: HttpClient, 
    private userInfo: LogingInfoService) { }

  verSaldo(): number {
    let cantity = -1
    this.client.get<string>(
      url + '/verSaldo', 
      {
        headers: {
          'Content-Type': 'application/json', 
          'userName': this.userInfo.getUser().getUserName(),
          'password': this.userInfo.getUser().getPassword()
        }
      }
    ).subscribe(
      data => {
        cantity = Number(data);
      }
    )
    return cantity;
  }
  addCrypto(crypto: number): boolean{
    let added = false;
    this.client.post<boolean>(
      url + '/addCrypto',
      new Crypto(crypto),
      {
        headers: {
          'Content-Type': 'application/json', 
          'userName': this.userInfo.getUser().getUserName(),
          'password': this.userInfo.getUser().getPassword()
        } 
      }
    ).subscribe(
      data => {
        added = data
      }
    )
    return added;
  }
}
// NOTE - no me queda claro pq no se usa async