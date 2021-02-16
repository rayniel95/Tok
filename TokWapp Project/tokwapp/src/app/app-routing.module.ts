import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogingComponent } from './components/loging/loging.component';
import {WalletComponent} from './components/wallet/wallet.component'

const routes: Routes = [
  {path: 'loging', component: LogingComponent},
  {path: '', redirectTo:'/loging', pathMatch: 'full'},
  {path: 'wallet', component: WalletComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
