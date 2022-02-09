import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import  { LOCALSTORAGE_KEYS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  public login(data: any): Observable<boolean> {
    if (data.userName == 'admin' && data.password == 'qwer4321') {
      localStorage.setItem(LOCALSTORAGE_KEYS['auth'], 'true');
      this.router.navigate(['']);
      return of(false)
    } else {
      return of(true)
    }
  }

  public logout(): void {
    localStorage.removeItem(LOCALSTORAGE_KEYS['auth']);
    this.router.navigate(['login']);
  }
}
