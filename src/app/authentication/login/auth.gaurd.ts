import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // logged in so return true

    // not logged in so redirect to login page with the return url
    if (localStorage.getItem('user') == null) {
      this.router.navigate(['/module']);
      return false;
    }

    return true;
  }
}
