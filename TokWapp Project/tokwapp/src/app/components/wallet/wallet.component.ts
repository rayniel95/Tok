import { Component, OnInit } from '@angular/core';
import { LogingInfoService } from 'src/app/services/loging-info/loging-info.service';
import {FormBuilder, FormGroup} from '@angular/forms'
import {Crypto} from 'src/app/models/crypto/crypto'

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  form: FormGroup;
  constructor(private userInfo: LogingInfoService, private formBuilder: 
    FormBuilder) {

    this.form = this.formBuilder.group(new Crypto(0))
  }

  ngOnInit(): void {
  }

}
