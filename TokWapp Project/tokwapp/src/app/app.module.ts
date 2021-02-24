import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogingComponent } from './components/loging/loging.component';
import{HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCryptoComponent } from './components/add-crypto/add-crypto.component';
import { ConsultFoundsComponent } from './components/consult-founds/consult-founds.component';
import { WalletsComponent } from './components/wallets/wallets.component'


@NgModule({
  declarations: [
    AppComponent,
    LogingComponent,
    AddCryptoComponent,
    ConsultFoundsComponent,
    WalletsComponent
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
