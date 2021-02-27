
/**
 * Modelo del usuario utilizado para almacenar informacion del mismo y
 * crear el formulario para el login.
 */
export class User {
    userName: string;
    password: string;

    public constructor(userName: string, password: string){
        this.userName = userName;
        this.password = password;
    }

    public getUserName(): string{
        return this.userName
    }
   
    public getPassword():string {
        return this.password
    }
}
