import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import {Crypto} from 'src/app/models/crypto/crypto'
import {AdderService} from 'src/app/services/adder/adder.service'
import {EventEmitter, Output} from '@angular/core'


@Component({
  selector: 'app-add-crypto',
  templateUrl: './add-crypto.component.html',
  styleUrls: ['./add-crypto.component.css']
})
export class AddCryptoComponent implements OnInit {
  form: FormGroup;
  @Output() addedFoundsCorrectly: EventEmitter<boolean>
  constructor(private formBuilder: FormBuilder, private adder: AdderService) {
    
    this.form = this.formBuilder.group(new Crypto(0))
    this.addedFoundsCorrectly = new EventEmitter<boolean>()
   }

  ngOnInit(): void {
  }

  add(crypto: {crypto: number}): void {
    this.adder.addFounds(crypto.crypto).subscribe(
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
