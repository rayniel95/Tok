import { Component, OnInit } from '@angular/core';
import { LogingInfoService } from 'src/app/services/loging-info/loging-info.service';
import {FormBuilder, FormGroup} from '@angular/forms'
import {Crypto} from 'src/app/models/crypto/crypto'
import {WalletService} from 'src/app/services/wallet/wallet.service'
import {Router} from '@angular/router'


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  form: FormGroup;
  visibleForm: boolean
  founds: any;
  // NOTE - creo que esto es un antipattern, lo ideal seria tener dos
  // componentes, uno para agregar y otro para ver, y que sean hijos de
  // esta
  constructor(private userInfo: LogingInfoService, private formBuilder: 
    FormBuilder, private wallet: WalletService, private router: Router) {

    this.founds = "cargando......"
    this.visibleForm = false;
    this.form = this.formBuilder.group(new Crypto(0))
  }

  ngOnInit(): void {
    if(!this.userInfo.isAuthenticated()){
      this.router.navigateByUrl('/loging')
      return;
    }
    this.visibleForm = false
    this.wallet.verSaldo().subscribe((data: number) => {this.founds = data})
  }

  addCrypto(crypto: Crypto){
    this.wallet.addCrypto(crypto.crypto).subscribe((res) => {
      this.visibleForm = false
      this.wallet.verSaldo().subscribe((data: number) => {this.founds = data})
    }) // NOTE - !!!!!a observable inside an observer, i dont like that creo
  } // que es el resultado de que deberia ser hijo de esta componente

  addMore(){
    this.visibleForm = true;
    console.log('se agrega')
  }
// TODO - embellecer el nombre de las variables y los metodos
}
