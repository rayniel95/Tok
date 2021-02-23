import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import {Crypto} from 'src/app/models/crypto/crypto'
import {AdderService} from 'src/app/services/adder/adder.service'
import {EventEmitter, Output} from '@angular/core'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-crypto',
  templateUrl: './add-crypto.component.html',
  styleUrls: ['./add-crypto.component.css']
})
export class AddCryptoComponent implements OnInit {
  
  walletNumber: number;
  form: FormGroup;
  @Output() addedFoundsCorrectly: EventEmitter<boolean>
  
  constructor(
    private formBuilder: FormBuilder, private adder: AdderService,
    private router: ActivatedRoute
  ) {
    this.walletNumber = 0
    this.form = this.formBuilder.group(new Crypto(this.walletNumber, 0))
    this.addedFoundsCorrectly = new EventEmitter<boolean>()
   }

  ngOnInit(): void {
    this.router.paramMap.subscribe(
      data=>{
        this.walletNumber = Number(data.get("walletId"))
      }
    )
  }

  add(crypto: {crypto: number}): void {
    this.adder.addFounds(this.walletNumber, crypto.crypto).subscribe(
      data => {
        if(data) {
          this.addedFoundsCorrectly.emit(true)
          return
        }
        this.addedFoundsCorrectly.emit(false)
      }
    )
  }

}
