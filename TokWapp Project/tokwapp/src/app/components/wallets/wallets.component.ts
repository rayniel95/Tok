import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CounterService} from 'src/app/services/counter/counter.service'
import { CreatorService } from 'src/app/services/creator/creator.service';
import {LogingInfoService} from 'src/app/services/loging-info/loging-info.service'


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
    private creator: CreatorService, private userInfo: LogingInfoService
  ) { 
    this.wallets = []
    this.maxNumberOfWalletOrError = false
  }
  // TODO - si no estas autenticado volver al loging
  ngOnInit(): void {
    if(!this.userInfo.isAuthenticated()){
      this.router.navigateByUrl('/loging')
      return
    }

    this.counter.countWallets().subscribe(data =>{
      this.wallets = range(data)
    })
  }

  addFoundToWallet(wallet: number){
    this.router.navigateByUrl(
      this.router.createUrlTree(["/wallets", wallet])
    )
  }

  createNewWallet(){
    this.creator.createWallet().subscribe(data =>{
      if(!data){
        this.maxNumberOfWalletOrError = true
        return
      }
      this.counter.countWallets().subscribe(data =>{
        this.wallets = range(data)
      })
    })
  }

}
