import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import  { LOCALSTORAGE_KEYS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  public login(data: any): void {
    if (data.userName == 'admin' && data.password == 'qwer4321') {
      localStorage.setItem(LOCALSTORAGE_KEYS['auth'], 'true');
      this.router.navigate(['']);
    }
  }

  public logout(): void {
    localStorage.removeItem(LOCALSTORAGE_KEYS['auth']);
    this.router.navigate(['login']);
  }
}
