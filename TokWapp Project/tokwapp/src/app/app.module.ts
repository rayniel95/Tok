import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogingComponent } from './components/loging/loging.component';
import { WalletComponent } from './components/wallet/wallet.component';
import{HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCryptoComponent } from './components/add-crypto/add-crypto.component';
import { ConsultFoundsComponent } from './components/consult-founds/consult-founds.component'


@NgModule({
  declarations: [
    AppComponent,
    LogingComponent,
    WalletComponent,
    AddCryptoComponent,
    ConsultFoundsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
