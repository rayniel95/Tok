import { Component, OnInit } from '@angular/core';
import { LogingInfoService } from 'src/app/services/loging-info/loging-info.service';
import {FormBuilder, FormGroup} from '@angular/forms'
import {Crypto} from 'src/app/models/crypto/crypto'
import {WalletService} from 'src/app/services/wallet/wallet.service'
import {Router} from '@angular/router'
import {Observable} from 'rxjs'


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  form: FormGroup;
  visibleForm: boolean

  constructor(private userInfo: LogingInfoService, private formBuilder: 
    FormBuilder, private wallet: WalletService, private router: Router) {

    this.visibleForm = false;
    this.form = this.formBuilder.group(new Crypto(0))
  }

  ngOnInit(): void {
    if(!this.userInfo.isAuthenticated()){
      this.router.navigateByUrl('/loging')
      return;
    }
    this.visibleForm = false
  }

  addCrypto(crypto: Crypto){
    this.wallet.addCrypto(crypto.crypto).subscribe((res) => {
      this.visibleForm = false
    })
  }

  addMore(){
    this.visibleForm = true;
  }
  // NOTE - me pregunto si se actualizaria el saldo una vez que se halla
  // agregado mas 
  saldo(): Observable<number>{
    return this.wallet.verSaldo()
  }

}
