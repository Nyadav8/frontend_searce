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
    // if (localStorage.getItem('userData') == null) {
    //   this.router.navigate(['/module'], {
    //     queryParams: { returnUrl: state.url },
    //   });
    //   return false;
    // }

    return true;
  }
}
