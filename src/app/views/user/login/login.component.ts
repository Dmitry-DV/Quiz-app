import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginResponseType } from 'src/types/login-response.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/), Validators.required]),
  });

  login(): void {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (data: LoginResponseType) => {
          if (data.error || !data.accessToken || !data.refreshToken || !data.fullName || !data.userId) {
            this._snackBar.open('Ошибка при авторизации');
            throw new Error(data.message ? data.message : 'Error with data on login');
          }

          this.router.navigate(['/choice']);
        },
        error: (error: HttpErrorResponse) => {
          this._snackBar.open('Ошибка при авторизации');
          throw new Error(error.error.message);
        },
      });
    }
  }
}
