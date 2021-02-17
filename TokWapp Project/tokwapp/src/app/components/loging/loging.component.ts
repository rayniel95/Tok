import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { User } from 'src/app/models/user/user';
import { LogingInfoService } from 'src/app/services/loging-info/loging-info.service';
import {AuthService} from 'src/app/services/auth/auth.service'
import {Router} from '@angular/router'


@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements OnInit {
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder, 
    private userInfo: LogingInfoService, private authService: AuthService,
      private router: Router) { 
    
    this.form = this.formBuilder.group(new User('', ''))
  }

  ngOnInit(): void {
    if(this.userInfo.isAuthenticated()){
      this.router.navigateByUrl('/wallet')
    }
  }
  // TODO - esto deberia hacerlo un servicio
  logingUser(userInfo: User){
    console.log(userInfo)
    if(this.authService.authenticateUser(
      userInfo.userName, userInfo.password)){

      this.userInfo.setUser(userInfo)
      this.userInfo.authenticate(true)
      this.router.navigateByUrl('/wallet')
      return
    }
    // TODO - usuario o contrasena mal, sacar algun cartel en la pagina
    console.log('bad username o password')
  }
}
