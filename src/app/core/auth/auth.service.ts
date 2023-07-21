import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, Subject } from 'rxjs';
import { LoginResponseType } from 'src/types/login-response.type';
import { UserInfoType } from 'src/types/user-info.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessTokenKey: string = 'accessToken';
  isLogged$: Subject<boolean> = new Subject<boolean>;

  private refreshTokenKey: string = 'refreshToken';
  private userInfoKey: string = 'userInfo';
  private isLogged: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem('this.accessTokenKey');
  }

  getLoggedIn(): boolean {
    return this.isLogged;
  }

  login(email: string, password: string): Observable<LoginResponseType> {
    return this.http.post<LoginResponseType>(environment.apiHost + 'login', {
     email,
     password
   })
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.isLogged = true;
    this.isLogged$.next(true);
  };

 setUserInfo(info: UserInfoType): void {
      localStorage.setItem(this.userInfoKey, JSON.stringify(info));
  };

 getUserInfo(): UserInfoType | null {
      const userInfo: string | null = localStorage.getItem(this.userInfoKey);
      if (userInfo) {
          return JSON.parse(userInfo);
      }
      return null;
  }

  private removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);  
    this.isLogged = false;
    this.isLogged$.next(false);
  };
}
