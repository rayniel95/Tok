import { Component, OnInit } from '@angular/core';
import { LogingInfoService } from 'src/app/services/loging-info/loging-info.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  visibleForm: boolean
  updateFoundsComp: boolean
  constructor(private userInfo: LogingInfoService, private router: Router) {
    
    this.updateFoundsComp = false;  
    this.visibleForm = false;
  }

  ngOnInit(): void {
    if(!this.userInfo.isAuthenticated()){
      this.router.navigateByUrl('/loging')
      return;
    }
    this.visibleForm = false
  }

  hideFoundsAndShowForm(){
    this.visibleForm = true
  }

  hideFormAndShowFounds(value: boolean){
    if(value){
      this.visibleForm = false;
      this.updateFoundsComp = !this.updateFoundsComp
    }
  }
}
