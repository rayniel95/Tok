import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { User } from 'src/app/models/user/user';
import { LogingInfoService } from 'src/app/services/loging-info/loging-info.service';
import {AuthService} from 'src/app/services/auth/auth.service'
import {Router} from '@angular/router'

/**
 * Componente encargada de gestionar toda la logica relacionada con la vista
 * de autenticacion (loging). Para ello utiliza dos propiedades, form que
 * es el formulario (creado con el modelo User) que se utiliza para
 * construir la vista y wrongUserOrPassword utiliaza en el caso de que el
 * nombre o la contrasena sean incorrectos poder mostrar una alerta. El 
 * formulario se construye utilizando un formBuilder a partir del modelo
 * usuario, este formBuilder crea un FormGroup, que no es mas que una especie
 * de representacion del modelo User en un formulario.
 */
@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements OnInit {
  form: FormGroup;
  wrongUserOrPassword: boolean
  constructor(private formBuilder: FormBuilder, 
    private userInfo: LogingInfoService, private authService: AuthService,
      private router: Router) { 
    
    this.form = this.formBuilder.group(new User('', ''))
    this.wrongUserOrPassword = false
  }
  /**
   * Un metodo que es ejecutado cuando se inicializa la componente, en este
   * caso si el usuario ya se encuentra autenticado se redirige a la componente
   * encargada de la logica de la vista de las wallets.
   */
  ngOnInit(): void {
    if(this.userInfo.isAuthenticated()){
      this.router.navigateByUrl('/wallets')
    }
  }
  // TODO - esto deberia hacerlo un servicio
  /**
   * Metodo que se ejecuta cuando el usuario hace submit del formulario. Este
   * metodo recibe un objeto que posee las mismas propiedades que el modelo
   * User y cuyos valores seran los introducidos por el usuario en el 
   * formulario. Notese como de cierta forma el formulario de construye 
   * utilizando el modelo User y luego, una vez se han introducido los valores
   * para cada input (que representan cada propiedad del modelo) se devuelve
   * un objeto similar con los valores de las propiedades. En el caso de que
   * los datos introducidos autentiquen al usuario se navega hacia la componente
   * encargada de gestionar las wallets en caso contrario se modifica la 
   * propiedad wrongUserOrPassword y se muestra una alerta.
   */
  logingUser(userInfo: {userName: string, password: string}){
    this.authService.authenticateUser(userInfo.userName, userInfo.password)
    .subscribe(res => {
      if(res){
        this.userInfo.setUser(new User(userInfo.userName, userInfo.password))
        this.userInfo.authenticate(true)
        this.router.navigateByUrl('/wallets')
        return
      }
      this.wrongUserOrPassword = true
      console.log('bad username o password')
    })
  }
}
