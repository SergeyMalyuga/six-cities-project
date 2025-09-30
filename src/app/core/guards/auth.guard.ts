import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AppRoute} from '../constants/const';

@Injectable()
export class AuthGuard implements CanActivate {
  private isAuth = false;
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if(this.isAuth) {
      return true;
    } else {
      return this.router.createUrlTree([AppRoute.LOGIN], {queryParams: {returnUrl: state.url}});
    }
  }
}
