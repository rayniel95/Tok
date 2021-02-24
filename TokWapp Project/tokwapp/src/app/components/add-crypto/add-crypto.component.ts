import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import {Crypto} from 'src/app/models/crypto/crypto'
import {AdderService} from 'src/app/services/adder/adder.service'
import { ActivatedRoute, Router } from '@angular/router';


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
    private activeRouter: ActivatedRoute, private router: Router
  ) {
    this.walletNumber = 0
    this.form = this.formBuilder.group(new Crypto(0))
   }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(
      data=>{
        this.walletNumber = Number(data.get("walletId"))
      }
    )
  }

  add(crypto: {crypto: number}): void {
    this.adder.addFounds(this.walletNumber, crypto.crypto).subscribe(
      data => {
          this.router.navigateByUrl('/wallets')
      }
    )
  }

}
