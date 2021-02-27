import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CounterService} from 'src/app/services/counter/counter.service'
import { CreatorService } from 'src/app/services/creator/creator.service';
import {LogingInfoService} from 'src/app/services/loging-info/loging-info.service'

/**
 * Crea un array de n numeros desde el 0 hasta n-1
 */
const range = (n: number) => Array.from({length: n}, (value, key) => key)

/**
 * Componente encargada de la vista de las wallets. Algo interesante en esta
 * componente es que para lograr su proposito utiliza dos componentes hijas, la
 * componente de visualizar los fondos en una wallet y la componente de agregar.
 * Esta componente crea una lista de tamano igual a la cantidad de wallets, en
 * donde cada elemento i corresponde a una componente que visualiza los fondos
 * de la wallet i, esto es una muestra de la "composicion" de componentes, lo
 * cual ayuda a la modularidad y mantener la sencillez de la aplicacion, una de
 * las fortalezas de Angular. La componente presenta dos propiedades, 
 * maxNumberOfWalletOrError utilizada para mostrar una alerta en caso de que se
 * haya llegado al maximo numero de wallets establecidas por el servidor y no
 * puedan crearse mas y wallets un array de numeros desde 0 hasta n-1 donde n
 * es la cantidad de wallets establecida por el servidor.
 */
@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {
  maxNumberOfWalletOrError: boolean
  wallets: number[]
  
  constructor(
    private counter: CounterService, private router: Router,
    private creator: CreatorService, private userInfo: LogingInfoService
  ) { 
    this.wallets = []
    this.maxNumberOfWalletOrError = false
  }
  /**
   * Metodo ejecutado al inicializar la componente, si el usuario no se 
   * encuentra autenticado se navega hacia la vista del login, de estar
   * autenticado se inicializa la propiedad wallets con el array de wallets
   * y se mostrara la lista de wallets en la vista, de no existir ninguna 
   * wallet el usuario podra crearlas.
   */
  ngOnInit(): void {
    if(!this.userInfo.isAuthenticated()){
      this.router.navigateByUrl('/loging')
      return
    }
  
    this.counter.countWallets().subscribe(data =>{
      this.wallets = range(data)
    })
  }
  /**
   * Si el usuario desea anadir fondos a una de las wallets podra dar clic en
   * el boton de la vista de fondos que desee y sera trasladado a la vista de
   * anadir fondos para esa wallet, notar que la URL tendra el identificador de
   * la wallet como un parametro. Este metodo estara enlazado al evento de clic
   * en cada uno de las componentes de visualizar fondos, de forma tal que 
   * al hacer clic en el boton, el evento emite el numero de la wallet, el cual
   * es pasado a este metodo. Esto es una muestra de la comunicacion entre una
   * componente padre y una componente hijo.
   */
  addFoundToWallet(wallet: number){
    this.router.navigateByUrl(
      this.router.createUrlTree(["/wallets", wallet])
    )
  }
  /**
   * Metodo para crear una wallet. Notar como se hace uso del servicio creator
   * el cual devuelve, como ya sabemos, un observable al cual podemos
   * subscribirnos. El observable se ejecutara de forma asincrona y una vez
   * termine ejecutara la funcion que se le pasa en el metodo subscribe, en 
   * caso de que no se haya creado la wallet se cambia a true la propiedad 
   * maxNumberOfWalletOrError mostrandose una alerta la cual una vez cerrada 
   * cambia nuevamente el valor de la propiedad a false. De crearse la wallet 
   * en el servidor se vuelve a actualizar la propiedad de la lista de wallets 
   * lo que trae como consecuencia que la vista se vuelva a actualizar 
   * "redibujandose" o "volviendose a mostrar" actulizando no solo la cantidad 
   * de wallets sino tambien los fondos en las mismas. Una muestra del poder 
   * de Angular a la hora de trabajar con vistas dinamicas y la sencillez del 
   * proceso que se necesita realizar.
   */
  createNewWallet(){
    this.creator.createWallet().subscribe(data =>{
      if(!data){
        this.maxNumberOfWalletOrError = true
        return
      }
      this.counter.countWallets().subscribe(data =>{
        this.wallets = range(data)
      })
    })
  }
  /**
   * Metodo encargado de realizar el logout, reinicia el servicio de 
   * almacenamiento (LogingInfoService) borrando la informacion que este
   * contiene y se navega hacia la vista de login.
   */
  logout(){
    this.userInfo.logout()
    this.router.navigateByUrl('/loging')
  }
}
