import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public invalidCredentials: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    const user = this.authService.authenticated();
    if (!!user) {
      setTimeout(() => {
        this.router.navigate(['/table']);
      }, 500);
      return;
    }
  }
  onSubmit() {
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(
        catchError(() => {
          this.invalidCredentials = true;
          return of(undefined);
        }),
      )
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/table']);
          this.authService.authenticated();
        }
      }, () => {
        this.invalidCredentials = true;
        return of(undefined);
      });
  }
  get f() {
    return this.loginForm.controls;
  }
}
