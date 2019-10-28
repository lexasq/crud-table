import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model.';
import { USERS } from '../interceptors/static/users.static';

@Injectable()
export class AuthService {
  public jwtToken: string;
  public user: BehaviorSubject<User> = new BehaviorSubject(null);
  public onLogin: EventEmitter<User> = new EventEmitter<User>();

  constructor(private router: Router,
              private http: HttpClient) {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.jwtToken = token;
    }
    const user = AuthService.getUserObjFromToken(localStorage.getItem('jwtToken'));
    this.user.next(user);
  }

  public static getUserObjFromToken(token: string): User {
    if (!token) {
      return;
    }
    // here should be awesome token-decode
    return USERS.find(x => x.token === token);
  }

  public login(username: string, password: string): Observable<boolean> {
    const body = {
      username,
      password
    };
    return this.http.post('api/obtain_token', body)
      .pipe(
        map((res: User) => {
          if (!res || !res.token) {
            return false;
          }
          localStorage.setItem('jwtToken', res.token);
          this.jwtToken = res.token;
          this.user.next(res);
          this.onLogin.emit(res);
          return true;
        })
      );
  }

  public authenticated(): BehaviorSubject<User> {
    const token = this.jwtToken;
    if (!token || this.jwtToken !== localStorage.getItem('jwtToken')) {
      return;
    }
    if (this.user.value.permission) {
      return this.user;
    }
    this.logout();
  }

  public logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigateByUrl('/login');
  }

  /**
   * API View that checks the veracity of a token, returning the token if it is valid.
   * @returns Observable
   */
  public verifyToken(): Observable<Object> {
    return this.http.post('api/verify_token', {
      token: localStorage.getItem('jwtToken')
    });
  }
}
