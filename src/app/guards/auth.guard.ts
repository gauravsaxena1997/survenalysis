import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

import { LOCALSTORAGE_KEYS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> |
      Promise<boolean | UrlTree> |
      boolean |
      UrlTree
  {
    if (localStorage.getItem(LOCALSTORAGE_KEYS['auth'])) {
      return of(true);
    } else {
      return this.router.createUrlTree(['login']);
    }
  }

}
