import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {url} from 'src/app/config'
import {Crypto} from 'src/app/models/crypto/crypto'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  constructor(private client: HttpClient) { 
  }
  // NOTE - aqui hay dos formas de implementar este patron, cual de las dos mas
  // interesantes, la primera es devolver observables a todo el que quiera
  // ejecutar un metodo, creandose un unico observable que va a ser suscrito
  // por un unico metodo en algun componente, una vez se realice la suscripcion
  // se ejecuta el observable cuya salida sera transformada una y otra vez
  // hasta que sea ejecutado el subscribe, el otro metodo es utilizar algun
  // subject el cual sera subscrito al observable del metodo que se desea
  // ejecutar y devolver este subject, este patron es mejor que el primero
  // en cuanto a performance ya que el ultimo observable del stack y asi 
  // sucesivamente se estaran ejecutando, el subject sera una cache de las
  // respuestas de cada observable.
  verSaldo(userName: string, password: string): Observable<number> {
    return this.client.get<string>(
      url + '/verSaldo', 
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
  addCrypto(userName: string, password: string, crypto: number): Observable<boolean>{
    return this.client.post<boolean>(
      url + '/addCrypto',
      new Crypto(crypto),
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