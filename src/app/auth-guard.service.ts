import { Injectable } from '@angular/core';
import { CanActivate, Router, Route, ActivatedRouteSnapshot,  RouterStateSnapshot,  CanActivateChild} from '@angular/router';

import { AuthStorageService } from './auth-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authStorageService: AuthStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (this.authStorageService.isLoggedIn) { return true; }
    this.authStorageService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }  
}
