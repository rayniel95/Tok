import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ConsulterService } from 'src/app/services/consulter/consulter.service';


/**
 * Componente encargada de la vista de ver los fondos de una wallet especifica.
 * Posee una propiedad walletNumber la cual puede ser bindeada (enlazada) a una
 * propiedad de alguna componente padre, la cual se encargara de pasar el valor
 * del identificador de la wallet. Ademas, una vez el usuario desea anadir 
 * fondos y hace clic en el boton para ello, se emite un evento con el numero
 * de la wallet correspondiente, mismo numero almacenado en walletNumber, este
 * numero puede ser captado por una componente padre para conocer a que wallet
 * pertenece el emisor. La propiedad toUpdate puede ser utilizada para 
 * comunicarle a la componente (de parte del padre de la misma) que debe 
 * actualizar su vista, en este caso no es utilizada, es una muestra de lo
 * potente que puede llegar a ser la jerarquia de componentes.
 */
@Component({
  selector: 'app-consult-founds',
  templateUrl: './consult-founds.component.html',
  styleUrls: ['./consult-founds.component.css']
})
export class ConsultFoundsComponent implements OnInit, OnChanges {
  founds: any
  @Output() foundsForAdd: EventEmitter<number>
  @Input() toUpdate: boolean
  @Input() walletNumber: number

  constructor(
    private consulter: ConsulterService,
  ) { 
    this.founds = 'loading.......'
    this.foundsForAdd = new EventEmitter<number>()
    this.toUpdate = false
    this.walletNumber = 0
  }
  /**
   * Metodo de inicializacion, se hace un request al servidor para obtener los
   * fondos de la wallet asignada.
   */
  ngOnInit(): void {
    this.requestParameter()
  }
  /**
   * Se emite el evento con el numero de wallet cuando el usuario hace clic en
   * el boton de la vista para agregar nuevos fondos.
   */
  addFounds(){
    this.foundsForAdd.emit(this.walletNumber)
  }
  /**
   * Cuando una de las propiedades de entrada (toUpdate o walletNumber) cambia
   * su valor se ejecuta este metodo el cual realiza una peticion al servidor
   * nuevamente
   */
  ngOnChanges(change: SimpleChanges){
    this.requestParameter()
  }
  /**
   * Metodo que realiza una peticion al servidor. Notar como el servicio
   * Consulter devuelve un observable al cual nos subscribimos para ejecutarlo
   * y una vez este a retornado un valor de forma asincrona se ejecuta la 
   * funcion que se encuentra en el subscribe, la cual actualiza la propiedad
   * found con los fondos de la wallet que son mostrados en la vista.
   */
  requestParameter(){
    this.consulter.consultFounds(this.walletNumber).subscribe(
      data => {
        this.founds = data
      }
    )   
  }
}
