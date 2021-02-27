import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http'
import {url} from 'src/app/config'
import {Crypto} from 'src/app/models/crypto/crypto'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'


/**
 * Simple servicio para el envio de los request a la api rest cada
 * metodo que provee esta relacionado con un endpoint y recibe usuario y
 * contrasena para autenticarse. Retorna un observable. Un observable no es
 * mas que un objeto que eventualmente realizara una accion, dicha accion
 * compienza a realizarse luego de que algo se subscriba, esto es ejecutar
 * el metodo subscribe, una vez que se ejecuta el metodo subscribe de forma
 * asincrona el observable comienza a trabajar y por cada valor que este genere
 * se ejecuta una funcion callback tambien de manera asincrona. Los observables
 * pueden ser modificados por operadores que actuan sobre los valores que se
 * generan transformandolos de distintas maneras.
 */
@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  constructor(private client: HttpClient) { 
  }
  /**
   * Devuelve un observable que realizara un pedido get a la api rest, 
   * a la URL /wallets?walletId=value se envia el usuario y contrasena en los
   * headers y el id de la wallet en la query de la URL, el resultado 
   * es transformado en un numero.
   */
  verSaldo(userName: string, password: string, wallet: number): Observable<number> {
    return this.client.get<number>(
      url + '/wallets',
      {
        headers: {
          'Content-Type': 'application/json', 
          'userName': userName,
          'password': password,
        },
        params: {
          'walletId': wallet.toString()
        }
      }
    ).pipe(map(res=>{
      return Number(res)
    }))
  }
  /**
   * Devuelve un observable que realizara un put (update) a uno de los endpoints
   * de la api rest. En este caso el put se raliza a la URL 
   * "/wallets?walletId=value" donde value es el numero de la wallet, de esta 
   * manera se actualiza o se agrega monedas a la wallet especificada por el 
   * walletId
   */
  addCrypto(userName: string, password: string, wallet:number, crypto: number): Observable<boolean>{
    return this.client.put<boolean>(
      url + '/wallets',
      new Crypto(crypto),
      {
        headers: {
          'Content-Type': 'application/json', 
          'userName': userName,
          'password': password
        }, 
        params: {
          'walletId': wallet.toString()
        }
      }
    ).pipe(map(res => {
        return Boolean(res)
    }))
  }
  /**
   * Devuelve un observable que contara la cantidad de wallets, en este caso
   * se realiza un get a la URL "/numberOfWallets"
   */
  walletCount(userName: string, password: string){
    return this.client.request(
      "GET",
      url + '/numberOfWallets', 
      {
        headers: {
          'Content-Type': 'application/json', 
          'userName': userName,
          'password': password,
        }
      }
    ).pipe(map(res=>{
      return Number(res)
    }))
  }
  /**
   * Retorna un observable que creara una nueva wallet. Para ello se realiza un
   * post a la URL "/wallets" enviando un cuerpo vacio, el cual sera descartado
   * por el endpoint
   */
  createWallet(userName: string, password: string){
    return this.client.post<boolean>(
      url + '/wallets', {},
      {
        headers: {
          'Content-Type': 'application/json', 
          'userName': userName,
          'password': password
        } 
      }
    ).pipe(map(res => {
        return Boolean(res)
    }))
  }
}
