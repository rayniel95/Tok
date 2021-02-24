import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCryptoComponent } from './components/add-crypto/add-crypto.component';
import { LogingComponent } from './components/loging/loging.component';
import {WalletsComponent} from './components/wallets/wallets.component'


const routes: Routes = [
  {path: 'loging', component: LogingComponent},
  {path: '', redirectTo:'/loging', pathMatch: 'full'},
  {path: 'wallets', component: WalletsComponent},
  {path: 'wallets/:walletId', component: AddCryptoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
