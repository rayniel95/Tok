import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {url} from 'src/app/config'
import {Crypto} from 'src/app/models/crypto/crypto'


@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  constructor(private client: HttpClient) { 
  }

  verSaldo(userName: string, password: string): number {
    let cantity: number = -1
    this.client.get<string>(
      url + '/verSaldo', 
      {
        headers: {
          'Content-Type': 'application/json', 
          'userName': userName,
          'password': password,
        }
      }
    ).subscribe(
      data => {
        cantity = Number(data);
        console.log(cantity)
      },
      error =>{console.log(error)}
    )
    console.log(cantity)
    return -1;
  }
  addCrypto(userName: string, password: string, crypto: number): boolean{
    let added = false;
    this.client.post<boolean>(
      url + '/addCrypto',
      new Crypto(crypto),
      {
        headers: {
          'Content-Type': 'application/json', 
          'userName': userName,
          'password': password
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
