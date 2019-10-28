// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
//
// @Injectable()
// export class CanActivateGuard implements CanActivate {
//   constructor(private authService: AuthService) {
//   }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const user = this.authService.authenticated();
//     if (!user) {
//       localStorage.setItem('redirect_url', state.url);
//       this.authService.logout();
//     }
//     return !!user;
//   }
// }
