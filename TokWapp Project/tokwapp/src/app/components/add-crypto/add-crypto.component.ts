import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import {Crypto} from 'src/app/models/crypto/crypto'
import {AdderService} from 'src/app/services/adder/adder.service'
import { ActivatedRoute, Router } from '@angular/router';
import { LogingInfoService } from 'src/app/services/loging-info/loging-info.service';


/**
 * Componente encargada de la vista de anadir los fondos en la wallet, esta
 * componente posee un formulario con un input en el cual se puede escribir
 * la cantidad de fondos a guardar en la wallet y un boton para enviar el 
 * formulario. El objeto FormGroup el cual contiene el formulario es almacenado
 * en la propiedad form. La propiedad walletNumber almacena el identificador
 * de la wallet a la que se agregaran los fondos.
 */
@Component({
  selector: 'app-add-crypto',
  templateUrl: './add-crypto.component.html',
  styleUrls: ['./add-crypto.component.css']
})
export class AddCryptoComponent implements OnInit {
  
  walletNumber: number;
  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder, private adder: AdderService,
    private activeRouter: ActivatedRoute, private router: Router,
    private userInfo: LogingInfoService
  ) {
    this.walletNumber = 0
    this.form = this.formBuilder.group(new Crypto(0))
   }
  /**
   * Metodo ejecutado al inicializar la componente. En caso de que el usuario
   * no este autenticado se navega hacia la vista del loging, en caso de estar
   * autenticado se obtiene el identificado de la wallet el cual se encontrara
   * en la URL. Para ello utilizando un servicio del router se accede a los
   * paramtros en la URL y obtenemos el valor del identificador.
   */
  ngOnInit(): void {
    if(!this.userInfo.isAuthenticated())
    {
      this.router.navigateByUrl('/loging')
      return
    }
    this.activeRouter.paramMap.subscribe(
      data=>{
        this.walletNumber = Number(data.get("walletId"))
      }
    )
  }
  /**
   * Para agregar fondos a una wallet una vez el usuario haya introducido el
   * valor a agregar y haga clic en el boton para hacer submit (enviar) se 
   * realiza un request utilizando el servicio adder y se navega hacia la vista
   * de las wallets nuevamente.
   */
  add(crypto: {crypto: number}): void {
    this.adder.addFounds(this.walletNumber, crypto.crypto).subscribe(
      data => {
          this.router.navigateByUrl('/wallets')
      }
    )
  }

}
