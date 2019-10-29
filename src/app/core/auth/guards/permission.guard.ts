import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import * as _ from 'lodash';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model.';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user: BehaviorSubject<User> = this.authService.authenticated();
    if (!user) {
      localStorage.setItem('redirect_url', state.url);
      this.router.navigateByUrl('login');
      this.authService.logout();
      return;
    }
    const scopes = route.data.scopes as Array<string>;
    const checkResult = _.some(scopes, (scope: string) => {
      return user.value.permission.indexOf(scope) > -1;
    });

    if (!checkResult) {
      this.router.navigateByUrl('403');
    }
    return checkResult;
  }
}
