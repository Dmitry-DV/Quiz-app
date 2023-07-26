import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class authForwardGuard implements CanActivate {
  constructor(
    private location: Location,
    private authService: AuthService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.getLoggedIn()) {
      this.location.back();
      return false;
    }

    return true;
  }
}
