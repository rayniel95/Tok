import { Injectable } from '@angular/core';
import {User} from "src/app/models/user/user"

@Injectable({
  providedIn: 'root'
})
export class LogingInfoService {
  user: User;
  constructor() { 
    this.user = new User('', '');
  }
  getUser(): User {
    return this.user
  }
  setUser(user: User): void {
    this.user = user
  }
}
