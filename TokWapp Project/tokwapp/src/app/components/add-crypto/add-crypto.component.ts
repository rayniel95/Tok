import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import {Crypto} from 'src/app/models/crypto/crypto'


@Component({
  selector: 'app-add-crypto',
  templateUrl: './add-crypto.component.html',
  styleUrls: ['./add-crypto.component.css']
})
export class AddCryptoComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(new Crypto(0))

   }

  ngOnInit(): void {
  }

  add(crypto: {crypto: number}): void {
    
  }

}
