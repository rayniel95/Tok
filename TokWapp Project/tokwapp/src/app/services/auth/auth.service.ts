import { Injectable } from '@angular/core';
import {WalletService} from 'src/app/services/wallet/wallet.service'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private walletService: WalletService) { }

  
}
