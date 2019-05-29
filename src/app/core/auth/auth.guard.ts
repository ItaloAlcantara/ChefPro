import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CpRoutes } from '../constants/cp-routes';
import { Token } from '../interfaces/token';
import { CpLocalStorageService } from '../services/common/cp-localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _cpLocalStorageService: CpLocalStorageService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.endpointWithoutVerification(state.url))
      return true;

    let token: Token = this._cpLocalStorageService.getToken();
    if (!token) {
      this._router.navigate([CpRoutes.LOGIN]);
      return false;
    }

    return true;
  }

  endpointWithoutVerification(url: string): boolean {
    return url == CpRoutes.LOGIN ||
      url == CpRoutes.REGISTER_USER;
  }

}
