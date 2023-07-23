import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class authForwardGuard implements CanActivate {
  // guard проверяет авторизован ли пользователь. если авторизован запрещает переходить на страницу signup
  constructor(
    private location: Location,
    private authService: AuthService,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAllowed = true;

    if (this.authService.getLoggedIn()) {
      this.location.back();
      return false;
    }

    return true;
  }
}
