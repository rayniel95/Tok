import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CounterService} from 'src/app/services/counter/counter.service'
import { CreatorService } from 'src/app/services/creator/creator.service';


const range = (n: number) => Array.from({length: n}, (value, key) => key)

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {
  maxNumberOfWalletOrError: boolean
  wallets: any

  constructor(
    private counter: CounterService, private router: Router,
    private creator: CreatorService
  ) { 
    this.wallets = []
    this.maxNumberOfWalletOrError = false
  }
  // TODO - si no estas autenticado volver al loging
  ngOnInit(): void {
    this.counter.countWallets().subscribe(data =>{
      this.wallets = range(data)
    })
  }

  addFoundToWallet(wallet: number){
    this.router.navigateByUrl(
      this.router.createUrlTree(["/wallets", wallet])
    )
  }
  // TODO - ver como se actualiza la lista de wallets
  createNewWallet(){
    this.creator.createWallet().subscribe(data =>{
      if(!data){
        this.maxNumberOfWalletOrError = true
      }  
    })
  }

}
