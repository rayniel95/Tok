import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { User } from 'src/app/models/user/user';
import { LogingInfoService } from 'src/app/services/loging-info/loging-info.service';
// TODO - que sucede si la autenticacion esta mal????? el usuario tendria que
// volver a autenticarse pero se necesita una forma de saberlo
@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements OnInit {
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder, 
    private userInfo: LogingInfoService, private router: Router) { 
    
    this.form = this.formBuilder.group(new User('', ''))
  }

  ngOnInit(): void {

  }

  logingUser(userInfo: User){
    console.log(userInfo)
    this.userInfo.setUser(userInfo)
    // TODO - en caso de que la autenticacion este mal se usa el router para
    // navegar hacia este componente de nuevo
  }
}
