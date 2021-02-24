import { Injectable } from '@angular/core';
import {User} from "src/app/models/user/user"

@Injectable({
  providedIn: 'root'
})
export class LogingInfoService {
  user: User;
  authenticated: boolean;
  
  constructor() { 
    this.user = new User('', '');
    this.authenticated = false
  }
  getUser(): User {
    return this.user
  }
  setUser(user: User): void {
    this.user = user
  }
  isAuthenticated(): boolean{
    return this.authenticated
  }
  authenticate(isAuthenticated: boolean): void {
    this.authenticated = isAuthenticated
  }
  logout(): void{
    this.user = new User('', '');
    this.authenticated = false
  }
}
